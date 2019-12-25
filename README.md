# yourAcademiaApi
API for Academic Informations App

# Articles

| Route | HTTP Verb	 | POST body	 | Description	 |
| --- | --- | --- | --- |
| /api/articles | `GET` | Empty | List all articles. |
| /api/articles | `POST` | {'title':'foo', 'category':'bar', 'content':'Turkey', categoryId:"id", keywords:'lorem,ipsum', favCount: '0', displayCount: '0', source: 'ww.lorem.com', user: 'lorem_ipsum' }
 | Create a new article. |
| /api/articles/:articleId | `GET` | Empty | Get a article. |
| /api/articles/:articleId | `PUT` | {'title':'foo', 'category':'bar', 'content':'Turkey', categoryId:"id", keywords:'lorem,ipsum', favCount: '0', displayCount: '0', source: 'ww.lorem.com', user: 'lorem_ipsum' }
 | Update a article with new info. |
| /api/articles/:articleId | `DELETE` | Empty | Delete a article. |
| /api/articles/top10 | `GET` | Empty | Get the top 10 articles. |

# Categories

| Route | HTTP Verb	 | POST body	 | Description	 |
| --- | --- | --- | --- |
| /api/categories | `GET` | Empty | List all categories. |
| /api/categories | `POST` | { name: 'foo', surname:'bar', bio:'lorem ipsum' } | Create a new category. |
| /api/categories/:categoryId | `GET` | Empty | Get a category. |
| /api/categories/:categoryId | `PUT` | {'name':'foo', 'surname':'bar', 'bio': 'lorem'} | Update a category with new info. |
| /api/categories/:categoryId | `DELETE` | Empty | Delete a category. |

# Index

| Route | HTTP Verb	 | POST body	 | Description	 |
| --- | --- | --- | --- |
| /register | `POST` | { username: 'foo', password:'1234' } | Create a new user. |
| /authenticate | `POST` | { username: 'foo', password:'1234' } | Generate a token. |


# Demo
[Live demo on Heroku](https://api-your-academia-server.herokuapp.com/)
