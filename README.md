# MATERIAL-on-edcat
App to Showcase Information from edcat.net

### API

1. All shop items

```
curl -X GET \
  https://stage.edcat.net/api/shop/items/ \
  -H 'key: 1234' 
```

2. Featured shop items (to display on the home page)

```
curl -X GET \
  https://stage.edcat.net/api/shop/items/featured/ \
  -H 'key: 1234' 
```

3. Get item details (it contains more information about item)

```
curl -X GET \
  https://stage.edcat.net/api/shop/items/21e53fa5-a861-44c8-998e-43dd28663775/ \
  -H 'key: 1234'
```

Where is `21e53fa5-a861-44c8-998e-43dd28663775` is item uuid

4. Cart information

```
curl -X GET \
  https://stage.edcat.net/api/shop/cart/ \
  -H 'key: 1234'
```