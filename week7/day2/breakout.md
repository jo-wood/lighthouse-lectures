# wk6d2 breakout

## ActiveRecord

* Associations

  * 1:many
  * belongs_to
  * has_many
  * many:many
  * has_and_belongs_to_many

* Validations

* may want custom validations
* where in the class Student < ActiveRecord::Base
* may be required in the exercise to give this explicit error message

* note that this validate method is just like saying
`validate :age_is_even, if: :age`
* under the hood
`validate("age_is_even", {"if" 'age"})`


  * validate :age_is_even

  * private

  * def age_is_even
      if age and age % 2 != 0
        errors.add(:age, 'age must be even')
      end
    end
  end

* Callbacks

* Migrations

## OOP

* from the 2 play math_game - the planning and organization:

* think of this in terms of UI, what needs to be tracked
state:
  current_question = { type: "*", numbers: [12, 23]}
  current_player_answer = 0
  current_player_index = 0
  player_lives = [3, 3]

derived:
  game_over?
  correct?()

events / transactions:
  next_round()
    * current_question
    * current_player_index
    * somehow waits?
    * take user input
    * check if correct
    * update player_lives
    * show stuff in ui
    * next_round()

* in this case easy, but maybe could further serperate the above
* handle_question(), handle_answer()

Turn
|  \
|   \
Game ---- Player
|
|
Player

* If doing the above use a heiarchy not a web
* that way turn goes to player1 and player2 but each player should be able to touch each others objects
* and the game itself is the glue that holds these various areas of changing state

* more to consider:
  * what objects are holding state (aka have instance variables)
  * and then where are we changing that state (no point in it being a state if it doesn't change)
  * which behaviours affect side effects
  * where are we 'puts'ing information
    * THESE ARE SIDE EFFECTS
  * we should actually not be puts'ing in one class, should have that class return the string it wants to print back to the main class
  