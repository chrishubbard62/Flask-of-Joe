## favorites

### get all favorites of a user
Returns all the favorites of the current user

* Required Authentication: True
* Request
  * Method: Get
  * URL: /api/favorites
  * Body: none

* Successful Response
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
        "Favorites": [
            {
                "id": 1,
                "user_id": 1,
                "coffee_id": 1,
            },
            {
                "id": 2,
                "user_id": 2,
                "coffee_id": 2,
            }
        ]
    }
    ```


### add an item to favorites

add an item to favorites page

* Require Authentication: True
* Request
  * Method: POST
  * URL: /api/favorites
  * Body:

    ```json
    {
        "user_id": 1,
        "product_id": 1
    }
    ```
* Successful Response
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "id": 1,
      "user_id": 1,
      "product_id": 1
    }
    ```

### delete one from favorites

Deletes a favorite from favorites.

* Require Authentication: true
* Require proper authorization: Favorite must belong to the current user
* Request
  * Method: DELETE
  * URL: /api/favorites
  * Body: none

* Successful Response
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Successfully deleted"
    }
    ```

## coffee images

### add image

add an image to a coffee product

* Require Authentication: True
* Require proper authorization: Coffee product must belong to the current user
* Request
  * Method: POST
  * URL: /api/coffee_images
  * Body:

    ```json
    {
        "coffee_id": 1,
        "url": "www.example.com"
    }
    ```
* Successful Response
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "id": 1,
      "coffee_id": 1,
      "url": "www.example.com"
    }
    ```
### get coffee image

Returns the images of the current coffee product.

* Require Authentication: true
* Request
  * Method: GET
  * URL: /api/coffee_images
  * Body: none

* Successful Response
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "id": 1,
      "coffee_id": 1,
      "url": "www.example.com"
    }
    ```
### delete image

Deletes an existing image.

* Require Authentication: true
* Require proper authorization: review image must belong to the current user
* Request
  * Method: DELETE
  * URL: /api/coffee_images
  * Body: none

* Successful Response
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Successfully deleted"
    }
    ```
