async function applyLoginToken() {
    const url = "/public/login.json"
    try {
        const options = {
            method: "GET",
        }
        const response = await fetch(url, options)
        const json = await response.json()
        localStorage.setItem("token", json.token)
    } catch (error) {
        console.error(error)
        alert(error)
    }
}

async function getProtectedResource() {
    try {
        const token = localStorage.getItem("token")
        const url = "/protected/resource.json"
        const options = {
            method: "GET",
            headers: { "Authorization": `Bearer ${token}` }
        }
        //fetch(url, options).then(response => response.json()).then(json => alert(json.message))
        const response = await fetch(url, options)
        if (response.status === 401) {
            // Handle unauthorized response
            throw new Error("Unauthorized: Please check your credentials.")
        }
        if (!response.ok) {
            // Handle other HTTP errors
            throw new Error("Network response was not ok")
        }
        const json = await response.json()
        alert(json.message)
    } catch (error) {
        console.error(error)
        alert(error)
    }
}

export default {
    applyLoginToken,
    getProtectedResource,
}