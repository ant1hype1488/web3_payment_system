from config import Config,render_template,app

@app.route("/")
def main():
    return  render_template("text.html")