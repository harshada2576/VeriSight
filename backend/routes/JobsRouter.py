# routes/JobsRouter.py
bg.add_task(background_process, job_id, save_path)
else:
background_process(job_id, save_path)


return JSONResponse({"id": job_id, "status": "created"})




def background_process(job_id: str, video_path: str):
try:
set_status(job_id, 'queued')
set_status(job_id, 'preprocessing')


art_dir = os.path.join(ARTIFACTS_DIR, job_id)
os.makedirs(art_dir, exist_ok=True)


meta = run_preprocess(video_path, art_dir)
update_metadata(job_id, meta)


set_status(job_id, 'inference')
result = fast_score(art_dir, max_frames=6)
write_result(job_id, result)
set_status(job_id, 'completed')
except Exception as e:
set_status(job_id, 'error')
write_result(job_id, {'error': str(e)})




@router.get("/jobs")
def list_jobs():
cur.execute("SELECT id, filename, status, created_at, updated_at FROM jobs ORDER BY created_at DESC")
rows = cur.fetchall()
out = []
for r in rows:
out.append({"id": r[0], "filename": r[1], "status": r[2], "created_at": r[3], "updated_at": r[4]})
return out


@router.get("/jobs/{job_id}")
def get_job(job_id: str):
cur.execute("SELECT id, filename, status, created_at, updated_at, metadata, result FROM jobs WHERE id = ?", (job_id,))
r = cur.fetchone()
if not r:
raise HTTPException(status_code=404, detail="job not found")
return {
"id": r[0], "filename": r[1], "status": r[2], "created_at": r[3], "updated_at": r[4],
"metadata": json.loads(r[5]) if r[5] else None,
"result": json.loads(r[6]) if r[6] else None
}


@router.get("/jobs/{job_id}/status")
def job_status(job_id: str):
cur.execute("SELECT status, updated_at FROM jobs WHERE id = ?", (job_id,))
r = cur.fetchone()
if not r:
raise HTTPException(status_code=404, detail="job not found")
return {"status": r[0], "updated_at": r[1]}


# helpers


def set_status(job_id, status):
cur.execute("UPDATE jobs SET status = ?, updated_at = ? WHERE id = ?", (status, time.time(), job_id))
conn.commit()




def update_metadata(job_id, metadata: dict):
cur.execute("UPDATE jobs SET metadata = ? WHERE id = ?", (json.dumps(metadata), job_id))
conn.commit()




def write_result(job_id, result: dict):
cur.execute("UPDATE jobs SET result = ? WHERE id = ?", (json.dumps(result), job_id))
conn.commit()
