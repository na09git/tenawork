from fastapi import FastAPI

app = FastAPI(title="Tenawork AI Engine")

@app.get("/")
def read_root():
    return {"message": "AI Engine is running"}

@app.get("/health")
def health_check():
    return {"status": "healthy"}
