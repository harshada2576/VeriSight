# services/inference_service.py
if not feats:
return None
arr = np.stack(feats, axis=0)
return arr.mean(axis=0), arr.std(axis=0)




def fast_score(artifact_dir: str, max_frames: int = 8) -> dict:
"""
Fast scoring pipeline for hackathon demo.
- Samples up to `max_frames` frames from artifacts/frames.
- Computes image features (ResNet backone) and returns an anomaly-like score (std of features).
- Computes a naive audio anomaly score from MFCC variance.
- Returns combined normalized score in [0,1].
"""
frames_dir = os.path.join(artifact_dir, 'frames')
frame_paths = sorted(glob.glob(os.path.join(frames_dir, 'frame_*.jpg')))
frame_paths = frame_paths[:max_frames]


feats = []
for p in frame_paths:
f = _image_feature(p)
if f is not None:
feats.append(f)


agg = _aggregate_features(feats)
visual_score = float(np.mean(agg[1])) if agg is not None else 0.0


# audio
audio_path = os.path.join(artifact_dir, 'audio.wav')
audio_score = 0.0
if os.path.exists(audio_path):
try:
y, sr = librosa.load(audio_path, sr=16000)
mfcc = librosa.feature.mfcc(y=y, sr=sr, n_mfcc=13)
audio_score = float(np.mean(np.std(mfcc, axis=1)))
except Exception:
audio_score = 0.0


# normalize heuristically
# visual_score may be large; scale via a simple sigmoid-ish mapping
def _norm(x, k=0.1):
return 1.0 / (1.0 + np.exp(-k * (x - 1.0)))


v_norm = _norm(visual_score)
a_norm = _norm(audio_score)


combined = 0.75 * v_norm + 0.25 * a_norm


# pick top frames for UI
top_frames = [os.path.basename(p) for p in frame_paths[:4]]


return {
'visual_score': float(v_norm),
'audio_score': float(a_norm),
