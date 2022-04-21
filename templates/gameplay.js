
    const button = document.querySelector('#submit-guess-btn');
    const secret_code = JSON.parse('{{ hidden_code | tojson }}');
    let guess_count = 0;
    let guesses_left;


    // document.querySelector('#gamelog').insertAdjacentHTML('beforeend', `<p>${secret_code}</p>`);

    button.addEventListener('click', evt => {
      evt.preventDefault();
      guess_count+=1;

      const formInputs = {
        num1: document.querySelector('#num-input1').value,
        num2: document.querySelector('#num-input2').value,
        num3: document.querySelector('#num-input3').value,
        num4: document.querySelector('#num-input4').value,
        hidden_code: secret_code
      };

      // send form input values to server to apply game logic
      fetch('/mastermind/guess', {
        method: 'POST',
        body: JSON.stringify(formInputs),
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then(response => response.json())
        .then(responseJson => {
          // handle correct guess
          if (responseJson.won){
            document.querySelector('#gameboard').insertAdjacentHTML('afterbegin', `<div class="winner">
                                                                                  <h1 class="win-title">YOU WIN!</h1>
                                                                                  <p>Secret Code: ${secret_code}</p>
                                                                                  <a href="/">
                                                                                    <button type="submit">New Game</button>
                                                                                    </a>
                                                                                  <div>`);
            document.querySelector('#user-guess-form').style.display = 'none';
            for (let i = 0; i < responseJson.num_correct_loc; i++) {
              document.querySelector(`.dot-feedback${guess_count}`).insertAdjacentHTML('beforeend', '<span class="dot red"></span>');
            }
          } else {

            // using response append feedback to the page
            document.querySelector('#gamelog').insertAdjacentHTML('beforeend', 
                                                                  `<p>Guess #${guess_count}: ${formInputs.num1} ${formInputs.num2} 
                                                                    ${formInputs.num3} ${formInputs.num4}</p>
                                                                  <div class="dot-feedback${guess_count}"></div><br>`);
            // color code dots for feedback 
            for (let i = 0; i < responseJson.num_correct_loc; i++) {
              document.querySelector(`.dot-feedback${guess_count}`).insertAdjacentHTML('beforeend', '<span class="dot red"></span>');
            }

            // of the num correct, subtract the number in correct locations in order to not double count correct nums
            let remaining_correct = responseJson.num_correct-responseJson.num_correct_loc;

            for (let i = 0; i < remaining_correct; i++) {
              document.querySelector(`.dot-feedback${guess_count}`).insertAdjacentHTML('beforeend', '<span class="dot white"></span>');
            }
          }
          
        });

        // keeping track of remaining guesses
        guesses_left= 10 - guess_count;
        document.querySelector('#guesses-left').innerHTML = guesses_left;

        // handling end of game after 10 guesses
        if(guess_count === 10){
          document.querySelector('#gameboard').insertAdjacentHTML('afterbegin', `<div class="gameover">
                                                                                  <h1 class="gameover-title">Game Over!</h1>
                                                                                  <p>Secret Code: ${secret_code}</p>
                                                                                  <a href="/">
                                                                                    <button type="submit">New Game</button>
                                                                                    </a>
                                                                                  <div>`);
          document.querySelector('#user-guess-form').style.display = 'none';
        }

    });