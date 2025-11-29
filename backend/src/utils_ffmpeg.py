import subprocess, shlex, json, os

def ffprobe_metadata(path):
    cmd = f"ffprobe -v quiet -print_format json -show_format -show_streams {shlex.quote(path)}"
    p = subprocess.run(cmd, shell=True, capture_output=True, text=True)
    try:
        return json.loads(p.stdout)
    except Exception:
        return {"error": "ffprobe_failed", "stderr": p.stderr}

def extract_frames(path, out_dir, fps=1):
    out_pattern = os.path.join(out_dir, "frame_%06d.jpg")
    os.makedirs(out_dir, exist_ok=True)
    cmd = f"ffmpeg -y -i {shlex.quote(path)} -vf fps={fps} {shlex.quote(out_pattern)}"
    subprocess.run(cmd, shell=True, check=True)

def make_preview_clip(path, out_path, duration=10):
    cmd = f"ffmpeg -y -i {shlex.quote(path)} -t {duration} -c:v libx264 -preset veryfast -c:a aac {shlex.quote(out_path)}"
    subprocess.run(cmd, shell=True, check=True)

def detect_corruption(path):
    try:
        cmd = f"ffmpeg -v error -i {shlex.quote(path)} -t 1 -f null -"
        p = subprocess.run(cmd, shell=True, capture_output=True, text=True, timeout=20)
        return p.returncode != 0
    except Exception:
        return True
