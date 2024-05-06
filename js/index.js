// let baseUrl = "https://tarmeezacademy.com/api/v1";
// ================================= Create post ==========================

// open Create post Modal
let btnCreatePost = document.querySelector("#add-post")
let cardPost = document.querySelector(".card-add-post")
let overlayPost = document.querySelector(".overlay")
let closeCreate = document.querySelector(".create-close")

// btnCreatePost.addEventListener("click", () => {
//     cardPost.classList.add("active")
// })

// close Create & Edit Modal
overlayPost.addEventListener("click", () => {
    cardPost.classList.remove("active")
})

closeCreate.addEventListener("click", () => {
    cardPost.classList.remove("active")
})

// Check Create & Edit Post Image
let inputImage = document.getElementById("inputImage")
let imgPost = document.querySelector(".create-image")

function checkPostImages() {
    // img change
    inputImage.addEventListener("change", function() { 
        imgPost.classList.add("active")
        imgPost.src = URL.createObjectURL(inputImage.files[0]);
        document.querySelector(".create-post-img").style.padding = "0"
})
}
checkPostImages()



function createNewPostClicked() {
    let postId = document.getElementById("post-id-input").value;
    let isCreate = postId == null || postId == "";
    const title = document.getElementById("title-input").value
    const body = document.getElementById("body-input").value
    const image = document.getElementById("inputImage").files[0]

    let formData = new FormData()
    formData.append("body", body)
    formData.append("title", title)
    formData.append("image", image)

    const token = localStorage.getItem("token")
    headerss = {
        "Content-Type": "multipart/form-data",
        "authorization": `Bearer ${token}`
    }

    let url = ``

    if(isCreate == true) {
        url = `https://tarmeezacademy.com/api/v1/posts`
    }else {
        formData.append("_method", "put")
        url = `https://tarmeezacademy.com/api/v1/posts/${postId}` 
    }
    // toggleLoader(true)
    axios.post(url, formData, {
        headers: headerss
    })
    .then((response) => {
        location.reload()
        if(isCreate == true) {
            showToast("success", 'New Post Has Been Created');
        }else {
            showToast("success", 'your post has been edit successfully');
        }
    }).catch((error) => {
        showToast("danger", error)
    })
    
}

// ==================================================== Edit post =============================
function openAndEditPostCliced(bolem ,postObject) {
    let user = getCurrentUser();
    document.querySelector(".create-user-name").textContent = user.username;
    document.querySelector(".create-user-img").textContent = user.profile_image;
    if(bolem) {

        document.querySelector(".create-btn").innerHTML = "Create Post"
        document.querySelector(".post-title h2").innerHTML = "Create A New Post"
        document.getElementById("title-input").value = ""
        document.getElementById("body-input").value = ""
        imgPost.src = ""
        cardPost.classList.add("active")
    }else{
        let post = JSON.parse(decodeURIComponent(postObject))

        document.querySelector(".create-btn").innerHTML = "Update Post"
        document.getElementById("post-id-input").value = post.id
        document.querySelector(".post-title h2").innerHTML = "Edit Post"
        document.getElementById("title-input").value = post.title
        document.getElementById("body-input").value = post.body
        imgPost.src = post.image
        cardPost.classList.add("active")
    }
    
}


// =========================================== Delete ===================================
function deletePostCliced(postObject) {
    document.querySelector(".delete-modal").classList.add("active")
    let post = JSON.parse(decodeURIComponent(postObject))

    document.getElementById("delete-post-id").value = post.id
}
function confirmPostDelete() {
    const token = localStorage.getItem("token")
    const postId = document.getElementById("delete-post-id").value;
     const url = `https://tarmeezacademy.com/api/v1/posts/${postId}`
     const headerss = {
         "Content-Type": "multipart/form-data",
         "authorization": `Bearer ${token}`
     }
     axios.delete(url, {
         headers: headerss
     })
     .then((response) => {
        document.querySelector(".delete-modal").classList.remove("active")
 
        showToast("success", 'The Post Has Been Deleted successfully')
        location.reload()
 
     })
     .catch((error) => {
        showToast("danger", error)
     })
}
let closeDelete = document.querySelector(".closeDelete");
closeDelete.addEventListener("click", () => {
    document.querySelector(".delete-modal").classList.remove("active")
})

// ============================================= Comments ======================
function postClicked(postId) {
    window.location = `comments.html?postId=${postId}`
}


// ========================================= Share ==============================

// open Modal Share
let shareModal = document.querySelector(".share-modal")
const overlayShare = document.querySelector(".overlayShare")

// Link Share

let LinkInput = document.querySelector(".LinkInput")
function sharepost(postId) {
    shareModal.classList.add("active")
    document.querySelector(".hiddenInput").textContent = `${postId}`
  

    LinkInput.value = `${document.location.origin}/share-post.html?postid=${postId}`
    let link = LinkInput.value
  
    document.querySelector(".share-modal .facebook").href =`https://www.facebook.com/share.php?u=${link}`
    document.querySelector(".share-modal .twitter").href  =`https://twitter.com/intent/tweet?text=${link}`
    document.querySelector(".share-modal .whatsapp").href =`https://api.whatsapp.com/send?text=${link}`
    document.querySelector(".share-modal .instagram").href =`https://api.whatsapp.com/send?text=${link}`
    document.querySelector(".share-modal .telegram").href =`https://api.whatsapp.com/send?text=${link}`
}
function sharedPost (postId) {
    window.location = `share-post.html?postid=${postId}`
}
let field = document.querySelector(".content .field")
let copy = document.querySelector("button.copy");
copy.onclick = () => {
    LinkInput.select(); // select input value
    if(document.execCommand('copy')) { // if selected value is copied
        field.classList.add("active");
        copy.innerText = "copied";
        setTimeout(() => {
            field.classList.remove("active");
            copy.innerText = "copy";
            window.getSelection().removeAllRanges()
        }, 3000)
    }
}
// close Modal Share

let closeShare = document.querySelector(".close-share");

overlayShare.addEventListener("click", () => {
    shareModal.classList.remove("active")
})

closeShare.addEventListener("click", () => {
    shareModal.classList.remove("active")
})

// ============================= Dowanload Image ============================
let urlInput = document.querySelector(".url-dowanload");



function downloadImager(link) {
    urlInput.value = `${link}`;
    document.querySelector(".dowanload-img").classList.add("active");
}
let yes = document.querySelector(".btn-click .yes");
let no = document.querySelector(".btn-click .no");



no.addEventListener("click", () => {
    document.querySelector(".dowanload-img").classList.remove("active");

})
yes.addEventListener("click", (e) => {
    document.querySelector(".dowanload-img").classList.remove("active");
    e.preventDefault();
    fetchFile(urlInput.value)
});

function fetchFile(url) {
    // fetching file & returing response as blob
    
    url.crossOrigin = "Anonymous"; // إذا كانت الصورة تتطلب إذن CORS
    fetch(url, {
        method: "POST",
        mode: "no-cors",
        headers: {
          "Content-Type": "text/xml",
          "X-PINGOTHER": "pingpong",
        },
    }).then(res => res.blob()).then(file => {
        // URL.createObjectURL creates a url of passed object
        let tempUrl = URL.createObjectURL(file);
        let aTag = document.createElement("a");
        aTag.href = tempUrl; // passing tempUrl as href value of <a> tage
        // =========== Dowanload =============
        aTag.download = url.replace(/^.*[\\\/]/, '');
        document.body.appendChild(aTag);
        aTag.click();
        aTag.remove()
        URL.revokeObjectURL(tempUrl)
    })
} 









// ================================ Copy Post Body =======================================
let copyText = document.querySelector(".copy-text");
function copyBady(body) {
    let bodyPost = body;
    copyText.value = bodyPost;
    copyText.select(); // select input value
    showToast("success", 'Copy Successfully')
        if(document.execCommand('copy')) { // if selected value is copied
            setTimeout(() => {
                window.getSelection().removeAllRanges()

            }, 3000)
        }
}



// ==================================================== User ===================================================
function userClicked(userId) {
    window.location = `profile.html?userid=${userId}`
}

// ================================================== BookMark ======================================
function clickSavePost(SaveId) {
    let post = JSON.parse(decodeURIComponent(SaveId))
    let webpost = document.getElementById(`${post.id}`)
    webpost.classList.add("bookmark");
    let search = bookMark.find((x) => x.id === post.id) 
    if (search === undefined) {
        bookMark.push({
        id: post.id,
        img: post.image,
        body: post.body
      })
    }
    localStorage.setItem("bookMark", JSON.stringify(bookMark)); 
  }
  function clickUnSavePost(postId) {
    let webpost = document.getElementById(`${postId}`)
    webpost.classList.remove("bookmark")
    localStorage.removeItem("bookMark")
}


// =================================================== Loader Post ===========================================
function toggleLoader(show = true) {
    if(show) {
        document.querySelector(".loaderPost").style.visibility = "visible"
    }else{
        document.querySelector(".loaderPost").style.visibility = "hidden"
    }
}