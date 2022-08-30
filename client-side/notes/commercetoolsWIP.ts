const accessToken = process.env.ACCESS_TOKEN
async function getProductProjections(queryParams: string) {
    // (mostly) generated code by Postman "Code Snippet: JS" when making use of Postman/Project/Product-projections/Search products by get
    const myHeaders = new Headers()
    myHeaders.append('Content-Type', 'application/json')
    myHeaders.append('Authorization', `Bearer ${accessToken}`)

    const redirect: RequestRedirect = 'follow'

    const requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: redirect,
    }

    const withParams = queryParams ? `?${queryParams}` : ''

    return fetch(
        `https://api.us-central1.gcp.commercetools.com/frontend-interview-exercise/product-projections/search${withParams}`,
        requestOptions
    )
        .then((response) => response.json())
        .then((result) => {
            return result
        })
        .catch((error) =>
            console.log('error: failed to fetch Product Projections', error)
        )
}

// const [data, setData] = useState()

// useEffect(() => {
//     async function fetchProductProjections() {
//         console.log('before')
//         const result = await getProductProjections('')
//         setData(result)
//         console.log('after')
//         // setFetchedData(result);
//     }
//     fetchProductProjections()
// }, [])
