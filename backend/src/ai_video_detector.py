# src/ai_video_detector.py
import cv2
import numpy as np
from skimage.metrics import structural_similarity as ssim
from pathlib import Path

def resize_gray(frame, width=640):
    h, w = frame.shape[:2]
    scale = width / float(w)
    new_h = int(h * scale)
    frame = cv2.resize(frame, (width, new_h), interpolation=cv2.INTER_AREA)
    gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
    return gray

def mse(a, b):
    return float(np.mean((a.astype("float32") - b.astype("float32")) ** 2))

def compute_optical_flow_mean(prev_gray, gray):
    flow = cv2.calcOpticalFlowFarneback(prev_gray, gray,
                                        None, 0.5, 3, 15, 3, 5, 1.2, 0)
    mag, ang = cv2.cartToPolar(flow[...,0], flow[...,1])
    return float(np.mean(mag)), mag

def robust_zscores(arr):
    arr = np.array(arr, dtype=np.float64)
    med = np.median(arr)
    mad = np.median(np.abs(arr - med))
    if mad == 0:
        mad = 1e-6
    z = 0.6745 * (arr - med) / mad
    return z

def analyze_video(path, width=640, z_threshold=5, require_votes=2):
    """
    Analyze video file at `path`. Returns a dict with:
    - score: 0..1 (fraction of frames flagged suspicious)
    - suspicious_ranges: list of (start_frame, end_frame)
    - metrics: arrays (mse, inv_ssim, flow_mean)
    """
    cap = cv2.VideoCapture(str(path))
    ok, prev = cap.read()
    if not ok:
        cap.release()
        raise RuntimeError("can't read video")

    prev_gray = resize_gray(prev, width)
    mses, ssims, flow_mags = [], [], []
    frames = 0

    while True:
        ok, frame = cap.read()
        if not ok:
            break
        gray = resize_gray(frame, width)
        mses.append(mse(prev_gray, gray))
        try:
            s = ssim(prev_gray, gray)
        except Exception:
            s = 0.0
        ssims.append(s)
        flow_mean, _ = compute_optical_flow_mean(prev_gray, gray)
        flow_mags.append(flow_mean)

        prev_gray = gray
        frames += 1

    cap.release()
    if frames == 0:
        return {"score": 0.0, "suspicious_ranges": [], "metrics": {"mse": [], "inv_ssim": [], "flow": []}}

    mses = np.array(mses)
    ssims = np.array(ssims)
    inv_ssim = 1.0 - ssims
    flow_mags = np.array(flow_mags)

    zm = robust_zscores(mses)
    zs = robust_zscores(inv_ssim)
    # we consider unusually LOW flow suspicious where motion expected: invert and zscore
    zf = robust_zscores(-flow_mags)

    votes = ((zm > z_threshold).astype(int) +
             (zs > z_threshold).astype(int) +
             (zf > z_threshold).astype(int))

    suspicious_idx = np.where(votes >= require_votes)[0].tolist()

    # group consecutive frames into ranges
    ranges = []
    if suspicious_idx:
        start = suspicious_idx[0]
        prev_i = start
        for i in suspicious_idx[1:]:
            if i == prev_i + 1:
                prev_i = i
            else:
                ranges.append((int(start), int(prev_i)))
                start = i
                prev_i = i
        ranges.append((int(start), int(prev_i)))

    score = float(len(suspicious_idx) / max(1, frames))
    return {
        "score": score,
        "suspicious_ranges": ranges,
        "metrics": {
            "mse": mses.tolist(),
            "inv_ssim": inv_ssim.tolist(),
            "flow": flow_mags.tolist()
        }
    }

