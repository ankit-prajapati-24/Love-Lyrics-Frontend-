const src = "https://checkout.razorpay.com/v1/checkout.js";
function loadScript(src) {
    return new Promise((resolve) => {
        const script = document.createElement("script");
        script.src = src;

        script.onload = () => {
            resolve(true);
        }
        script.onerror= () =>{
            resolve(false);
        }
        document.body.appendChild(script);
    })
}

const addSubscriptions = async() =>{
    
     const res =   await loadScript(src);
     if(!res) return;

     

    
}

