# Solar Ecommerce App

### Front-end Architecture 
```mermaid
graph TD
id1[Hello world] --> id2[Something just like this]
id2 --> id3[THis ios me]
id2 --> id4[Who are you]

```

Future features

- Send email weekly, daily, monthly about the number of orders, growth, revenue changes and shit like that

- Machine learning to predict monthly growth (weekly task)


### Database schema

```mermaid
erDiagram 
    STORE {
        int id
        string name
        string userId
        createdAt DateTime
        updatedAt DateTime
        billboards Billboard[]
    }
    BILLBOARD {
        int id 
        string label
        string imgUrl
        createdAt string
        updatedAt string
        storeId string
        
    }

    CATEGORY {
        string id
        string name
        DateTime createdAt
        DateTime updatedAt

    }

    PRODUCT {
        string id
        string name
        string categoryId
        string sizeId
        string colorId
        string imageId

    }
    STORE ||--o{ BILLBOARD : "has many"
    CATEGORY ||--o{ PRODUCT : "contains many"
```