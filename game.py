import requests

def generate_hidden_code():
    """Sends GET Request to random.org API
    and returns a list of 4 numbers as strings between 0-7"""

    payload = {'num': '4',
                'min': '0',
                'max': '7',
                'col': '1',
                'base': '10',
                'format': 'plain',
                'rnd': 'new'}

    req = requests.get('https://www.random.org/integers/', params=payload)
    
    hidden_code = []
    for num in req.text.splitlines():
        hidden_code.append(num)

    return hidden_code

def is_guess_correct(hidden_code, player_guess):
    """Takes in two lists and returns a bool to indicate if the two lists are identical"""
    if hidden_code == player_guess:
        return True
    
    return False

def get_num_correct(hidden_code, player_guess):
    """Takes in two lists and returns the number of commonalities in that list"""
    num_correct = 0
    for num in player_guess:
        if num in hidden_code:
            num_correct+=1
            hidden_code.remove(num)
    
    return num_correct

def get_num_correct_loc(hidden_code, player_guess):
    """Takes in two lists and returns """
    num_correct_loc = 0
    for idx, num in enumerate(player_guess):
        if num == hidden_code[idx]:
            num_correct_loc+=1
    
    return num_correct_loc

def evaluate_guess(hidden_code, player_guess):

    if is_guess_correct(hidden_code, player_guess):
        return {"won": True}

    num_correct_loc = get_num_correct_loc(hidden_code, player_guess)
    num_correct = get_num_correct(hidden_code, player_guess)

    response_dict = {
        "won": False,
        "num_correct": num_correct,
        "num_correct_loc": num_correct_loc
    }

    return response_dict

    
# hidden_code1 = ['4', '3', '2', '1']
# player_guess1 = ['3', '4', '0', '4']
# print(evaluate_guess(hidden_code1, player_guess1))
