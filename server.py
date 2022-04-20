"""Server for Mastermind Game"""

from flask import Flask, render_template, jsonify, request
import game

app = Flask(__name__)

@app.route("/")
def homepage():
    return render_template("homepage.html")

@app.route("/mastermind")
def mastermind():
    hidden_code = game.generate_hidden_code()
    return render_template("gameboard.html", hidden_code=hidden_code)

@app.route("/mastermind/guess", methods=["POST"])
def mastermind_guess():
    num1 = request.json.get("num1")
    num2 = request.json.get("num2")
    num3 = request.json.get("num3")
    num4 = request.json.get("num4")
    hidden_code = request.json.get("hidden_code")
    player_guess = [num1, num2, num3, num4]

    if game.is_guess_correct(hidden_code, player_guess):
        return {"won": True}

    num_correct_loc = game.get_num_correct_loc(hidden_code, player_guess)
    num_correct = game.get_num_correct(hidden_code, player_guess)

    response_dict = {
        "won": False,
        "num_correct": num_correct,
        "num_correct_loc": num_correct_loc
    }

    return response_dict

if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0")