# W7D3 - Lecture - Rails

* in terminal:

`gem install rails`
`rails new contact_list -d postgresql --no-coffee`

* creates all the files we would never go through the process of creating ourselves

* the below allows us to choose which version of rails we are going to use (as projects can require diff versions just like ruby)
* use the help to see most common rails commands

`bin/rails help`

* console command - allows us to for instance create a new object in the console and save directly to database as we did yesterday

`bin/rails s`

* where s is short for server as described in the help command
* starts up in localhost:3000
* will see ActiveRecord crash as there is NoDatabaseError as we do not have a db yet
* browser will also have console relative to an rb console

* if we open this project, how do we create a db?
* look inside config
* locals> database.yml
* this file is processed by ruby, so we can give alias to certain keys:
  * ie default: $default adapter: postresql etc
    * development: <<: *default database: contact_list_development

* within the pool RAILS_MAX_THREAD spec, don't want to have this value at something like 10 - (follow up on why this was said)
* the database name and then underscores the environment (set by default)

* but adjust these below for your own dev environment:

`development:
  username: postresql
  password: postresql
  host: localhost
`

`test:
  username: postresql
  password: postresql
  host: localhost
`

`bin/rake db:create`

* then check in localhost
* default page should show "Yay! You're on Rails!"

* Rails is an MVC framework

* seperates out the 3 areas of a web app
* browser req comes in
* rails pumps it through a Router
* converts this Router method to a controller 
* the controller will talk to the Model layer
* ask the Model layer asks the DB for what data it needs
* then what it gets back it will send to View
* the view will then render out all that data


* now within locals folder of our project
* and in routes.rb

```ruby

Rails.application.routes.draw do
  get '/blah', to: 'blah#index'

  root to: 'home#index'
end

```

* as we add routes, can go to terminal and enter `bin/rake routes`
* this will list out our routes.rb file with each route that it knows we can access (can check that entering them correctly)

```ruby
# routes.rb
Rails.application.routes.draw do
  # get '/blah', to: 'blah#index'

  root to: 'home#index'
end

# application_controller.rb
class ApplicationController < ActionController::Base

end

# home_controller.rb
class HomeController < ApplicationController
  def index
  end
end

```

* note in views folder, there is layouts folder
* these are in .html.erb format
  * looks like ejs but better
  * ie when we would need to include partials of header, we needed to include that explicity within the syntax
  * in erb - say in the body tag, can have: `<%= yield %>` and it will let whatever is already within this tag render

* added 'home' folder in views
* `home.html.erb` file inside
* this file for example just adding `<h1>Hello World!</h1>`
* the yield tag within the head tags, can see in browser

* for the jungle project, mimicking the process of seeing a new project and having to work ontop of it
* best to start in the console log to start discovering how the app works

* will see the logs on 'Processing by HomeController#index as HTML'
  * 'Rendering home//index/html/erb within ...'

* we named the method index in the controller which therefore looked within our home folder for the index view

* What if want to send data from the index to the controller?

```ruby
# home_controller.rb
class HomeController < ApplicationController
  def index
    # params being anything within the url
    # p params
    @name = params[:name]
  end
end
```

* now in index.html.erb
* can actually pass this instance variable

```html
<h1>Hello, <%= @name %>! </h1>
```

* and then on localhost url
* `/?name`
* and then we can pass:
* `/?name=Dave`
* and our page will now say:

'Hello, Dave!'

* now back in terminal

* still want everything in our routes to be RESTful
* Rails will build using generator and do this for us nicely
* `bin/rails g`

* Rails generator options:
* 'Channels' is for sockets
* 'job' (don't want to make a sales report inline, so jobs offloads to another worker and allows user to continue)
* 'resource' will build out everything from a Model Controller (except views)
* 'scaffold' will build out evertthing including views

* `bin/rails g scaffold Contact first_name:string last_name:string email:string`
* when scaffolding should use singular not plurals since this is a model
* Rails will actually fix it for us, but still should follow convention
* creates a model Contact, creates unit tests, adds a line to our routes, and then scaffolded out our controller for the contact, and created multiple views for our contacts, unit test for the controller itself, some json views, and a coffee script assest, and css stylesheet - since we are using scaffold it also created scss file for us

* now look in routes.rb
* will see new line of code
* this created 8 routes for us:
* see in console (GET /contacts/new, PATCH /constacts/:id etc)

* within contacts_controller.rb
* can see methods of 'new' and 'edit' and 'create' etc, with comments above that show 'GET /contacts ...' which route this method works for based on this auto-generate
* note that each route has '(.:format)' at the end to tell it that we don't necessarily want it comming back in 'html' form

* see in contacts_controller.rb
* within create method
* respond_to do |format|
* and within here telling wheter format.html or format.json depending on if .save or not

* same occuring for the update page
* THIS WAS WHAT WE LOOK AT WITH JOHNATHAN AND JUNAID, if the save didn't occur within the create, then the rendered format has coded for the different options of what to send back (maybe a redirect to html that the contact was successfully created , or json that renders the new information from the form)

* now keyword  'private'
* and then def set_contact and contact_params methods are private because we don't want to trust user input

* then within the index.html.erb

* there is a tbody tag
* it is looping the @contacts.each and for each contact
* within the td cells it is listing the contact.first_name, etc
* note that the link_to 'Show' and these link_to are our different routes
* the destroy added a delete method while also adding a confirm attribute which will be added to the button so that an alert will trigger

* when there is a link with a method, when clicked, the unobstructed js will translate to GET request

* within the new.html.erb
* it is rendering a form, and passing contact which will become the variable that we accept from the form

* the form linked to is a partial: _form.html.erb
* form_with (or form_for depending on rails version)
* will populate based on the specifc model we are using 
* THIS IS WHERE WE CAN VALIDATE AND SEE IF ANY ERRORS in creating this new contact

* within the index.json.jbuilder
* renders out an array that we will work from - from the @contacts list
* and for each contact it will call the contact.json.jbuilder
* NEED OUR API TO USE JBUILDER LIKELY IF USING A REACT FRONT END but for jungle don't need to worry about jbuilder to much

* within our db migrate folder
* a new CreateContacts class from ActiveRecord::Migration
* it knows to rollback or create (drop or create table) based on teh change that we are sending it
* Change good for altering tables, adding indexes etc, BUT if doing anything special need to use UP and DOWN to tell Rails this explicit change

* now back in terminal

```
bin/rake db:migrate

```

* when any of our migrates run, the schema.rb changes
* DON'T CHANGE DIRECTLY
* This schema is where our db is defined (when migrate ran it dumped the schema in this file)
* This is a good place to understand what models exist and what fields they have etc

* now in browser

* go to /contact route
  * and check in terminal the log of this route request
  * important variable, the time it took to run the query on the params, and see our complexity at work in terms of efficiency
* can see on this route on browser the details of this
* in terminal see details of the POST /contacts
* authenticty token was made
* on every request of the form, a token is given so that when a request is made it checks against this when the form is submitted, so everytime i try to go to the form, a new token is submitted
* THIS IS GOOD for web apps as many security measures are built in, rather than us have to write them ourselves
* therefore prevent this request being able to send multiple times in curl
* which would overload the server and crash booms happen because people can be bad people :(
* shows the data that was entered in the form fields
* then can see this contact was inserted into the database
* and then finally can see a redirect to the GET /contacts/1 was executed

* could now click edit and see in the log that this was a PATCH /contacts/1
* and then can see that this was a UPDATE transaction to the database

* within the controllers folder, helpers folder
* module with ContactsHelper/ end

* wihthin javascripts folder, in the stylesheets, the '//=' tells sproket what to do! works wiht our assests - its putting it into a single css and single js file


class Admin::CategoriesController < ApplicationController

  def index
    @categories = Category.all
  end

  def new
    @category = Category.new
  end

  def create
    @category = Category.new(product_params)

    if @category.save
      redirect_to [:admin, :categories], notice: 'Category created!'
    else
      render :new
    end
  end

end