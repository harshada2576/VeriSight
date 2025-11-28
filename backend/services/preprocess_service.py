# services/preprocess_service.py
subprocess.run(cmd, check=True, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL, timeout=timeout)
return True, None
except Exception as e:
return False, str(e)




def probe_metadata(video_path: str) -> dict:
# lightweight ffprobe call to get duration and streams
cmd = [FFPROBE, "-v", "error", "-show_format", "-show_streams", "-print_format", "json", video_path]
try:
out = subprocess.check_output(cmd)
return json.loads(out)
except Exception:
return {}




def run_preprocess(video_path: str, out_dir: str) -> dict:
"""
Extracts:
- frames at 1 fps -> out_dir/frames/
- audio wav 16k mono -> out_dir/audio.wav
- preview clip (first 6s) -> out_dir/preview.mp4
Returns metadata dict
"""
Path(out_dir).mkdir(parents=True, exist_ok=True)
frames_dir = os.path.join(out_dir, "frames")
os.makedirs(frames_dir, exist_ok=True)


# frames 1fps
frame_pattern = os.path.join(frames_dir, "frame_%04d.jpg")
ok, err = safe_run([FFMPEG, "-y", "-i", video_path, "-vf", "fps=1", frame_pattern], timeout=60)
if not ok:
raise RuntimeError(f"ffmpeg frames failed: {err}")


# audio
audio_out = os.path.join(out_dir, "audio.wav")
ok, err = safe_run([FFMPEG, "-y", "-i", video_path, "-vn", "-ar", "16000", "-ac", "1", audio_out], timeout=30)
if not ok:
raise RuntimeError(f"ffmpeg audio failed: {err}")


# preview clip (6s)
preview_out = os.path.join(out_dir, "preview.mp4")
ok, err = safe_run([FFMPEG, "-y", "-i", video_path, "-ss", "0", "-t", "6", "-c", "copy", preview_out], timeout=20)
if not ok:
# nonfatal
preview_out = None


meta = probe_metadata(video_path)
metadata = {
"frames_extracted": len(os.listdir(frames_dir)),
"preview": os.path.basename(preview_out) if preview_out else None,
"ffprobe": meta
}
return metadata
