# W7D4 Lecture
---
## View and Route Helpers in Rails

* ie in html, the `image_tag` is  helper
`button_to`

* more complex because these are not generic
`remove_item_cart_path`

* in the bin/rake routes

* could always write these things yourself, but should really be using the helpers where can
* emphasis on convention, will run into problems the more you implement vs working within rails

ie.

* could write <form action="/cart/remove_item" method="POST">
* could look in the browser console and see there is an input hidden (security reasons - later discussion)
* but using rails makes this a) more compact, and b) don't need to explicitly right the path
* can just pass the arguments directly into the helper method of remove_item_cart(product_id: product.id)
* also if this route ever changed, we don't have breaks within our code as rails is what generates these helper methods based on the routes

### link_to

* helper of 'link_to'
* doesn't initially seem like its saving us much from making a simple href
* but 
* the prefix is always between url (full path, aka full route to the url of http://localhost:3000)
* in general probably just need the path (relative link) (cart_path) 

* some of the paths take arguments (such as id)
* and that's what we pass into that html helper method (use use use the routes to help)
* ie: cart_path(id: product.id, other: 'info')
* it also knows what other parameters are passsed are related to a query in the url

* link_to "Foobar", product
* the render knows that @products is an array, so it knows that each index will be a product, and that the product is a partial
* it does this through knowing the class of the model
* therefore if you name a partial wrong and in the wrong place its not going to know and match correctly based on the class that was assigned to that thing
* easy when starting a project perhaps, so not wasting time thinking through what templates later and where to put etc etc
* but down road when want to change a lot of things that will become complicated to go against its establishing of plurality of our models
* <%= link_to "Foobar", product %>
* this did the same thing as link_to product_path
* much like in the way of render @products, this is an ActiveRecord object, I can see its class, I can see if there is a show for this thing, and there is a route, and therefore will use this for that
* can even distingush that the object is not saved, it will link to create (not set in our jungle app however)
* use the simplest, less friction way

* James sending Asset Tags that are common helpers


### form_for

* when making forms in rails, better to use form_for rather than the form tag
* because then you can specifiy which form and add your do statements
* then within teh form group, each form feild can use the keywords params
* it will see what object you are creating the form for
* then when theres a text.field name, it will make the default related to that keyword, say new product, it will add those tags and links to the path for you

* general form paths, form_for @product, looking at the create path etc, but we have these under admin
* but therefore form_for [:admin, @product]
* first arg is the namespacing of the object

### additional built in helpers:

* there are helpers for if Electric Chairs now only has qty 1, it handles the logic to say Electric Chair
  * not super complicated, but enough of a pain to have to do this everywhere - and want your UX to pay attention for users

* also currency helpers - adds the dollar sign and comma with 2 dec if we want
  * number_to_currency( ?product.price?  / 100.0 )
  * could use locale to pass as well based

* truncate is helpful, because sometimes truncate will slice at the html, and that shows in the preview

### Custom Helpers

* 'monkeypatching'
  * adding defs to existing classes, so when added .plurlize to the fancy_product method - it was acting on a string
  * @product.name.bloop by adding a class String def bloop self + "emoji" etc...
  * this was adding somethign to an existing Ruby class, which we want to be VERY careful doing
  * but pluralize was a built in so that we could operate on this existing class of String, so therefore want to leverage these rather than add our own method that extends the built in classes

* safer to add them as helper methods that you call as functions

```ruby
module ApplicationHelper
  def looks_coool s
    "?emoji?#{s}?emoji?"
  end
end


#products_helper.rb

module ProductsHelper
  def fancy_product p
    "?emoji?#{p.name}"
  end
end

# now in _product.html.erb
looks_cool(fancy_product(product)



# ProductsController
def show
  @product = Product.find params[:id]
  ProductsControler.helper.fancy_product(@product)
end

# this way we have this helper link specifically to the product controller

```

* could amke a module that could be anything and name it anything so its available in any template
* but when ProductsController.helpers (this means they are going to automatically add a helper that says products helper- aka don't need to write that explicitly within that controller)

* the ProductsHelper was available everywhhere
* but int eh controllers it was only available within that specifc objects controller
* therefore could use them there, but would need to specify that part within the controller itself (again going against some conventions here)


```ruby

class Beep

  def hello
    puts "Hello!"
  end

# useful if you want to handle an undefined method within the class
  def method_missing(method, *args)
    puts "The #{method} method was passed #{args.join(', ')} are great"
  end

end

```


#### notes on pairing other FE

* views could have React, there is something that puts React within rails but not very common?
* there is some framework that helps pair them seperately?
* turbolinks is the way that rails does its interactivity (a little more dated)
* but to have a more modern FE framework such as React, just keep them competely  seperate
