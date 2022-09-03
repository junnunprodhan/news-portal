const cetagories = () => {
    fetch(`https://openapi.programming-hero.com/api/news/categories`)
      .then(res => res.json())
      .then(data => displayCetagories(data.data.news_category))
      .catch(error => console.log(error))
  }
  const displayCetagories = cetagoryList => {
    const cetagoriesContainer = document.getElementById('cetagories-container');
    cetagoryList.forEach(cetagory => {
      const cetagoryDiv = document.createElement('div');
      cetagoryDiv.classList.add('cetagoryDiv');
      cetagoryDiv.innerHTML = `
      <p onclick="displayNews('${cetagory.category_id}')" class ="cetagory-list-item mb-0 ms-2">${cetagory.category_name}</p>
      `;
      cetagoriesContainer.appendChild(cetagoryDiv);
    })
  }
  cetagories();
  const displayNews = async category_id => {
    spinner(true);
    const newsContainer = document.getElementById('news-container');
    newsContainer.innerText = '';
    try {
      const url = `https://openapi.programming-hero.com/api/news/category/${category_id}`
      const res = await fetch(url);
      const data = await res.json();
      displayNewsCards(data.data)
    }
    catch (error) {
      console.log(error);
    }
  }
  const displayNewsCards = allNews => {
    const newsNotification = document.getElementById('news-notification');
    if (allNews.length === 0) {
      newsNotification.innerText = `No items found for this cetagory !`;
    }
    else {
      newsNotification.innerText = `${allNews.length} items found for this cetagory`;
    }
    const newsContainer = document.getElementById('news-container');
    newsContainer.innerText = '';
    allNews.sort((a, b) =>  b.total_view - a.total_view);
    allNews.forEach(singleCetagory => {
      const cards = document.createElement('div');
      cards.innerHTML = `
      <div class="card mb-4 mx-auto">
      <div class="row">
        <div class="col-md-4 text-center text-md-start">
          <img src="${singleCetagory.thumbnail_url}" class=" img-fluid rounded-start" alt="...">
        </div>
        <div class="col-md-8">
          <div class="card-body mt-4 news-card-body">
            <h5 class="card-title">${singleCetagory.title}</h5>
            <p class="card-text mt-3 mb-1 text-secondary">${singleCetagory.details.slice(0, 240)}...</p>
          </div>
          <div class="w-100 d-flex justify-content-between align-items-center news-card-footer">
          <div class="d-flex">
            <div class="ms-3 ms-md-0">
              <img class ="author-image" src="${singleCetagory.author.img}" alt="">
            </div>
            <div class="ms-3">
              <p class="my-0 fw-semibold">${singleCetagory.author.name === '' ? 'No data found' : singleCetagory.author.name}</p>
              <p class="text-muted">${singleCetagory.author.published_date?singleCetagory.author.published_date.slice(0, 10):"No data found"}</p>
            </div>
          </div>
          <div class="d-none d-md-block">
          <i class="fa-regular fa-eye me-1"></i>
          <span class="fw-semibold">${singleCetagory.total_view ? singleCetagory.total_view : 'No data found'}</span>
          </div>
          <div class="d-none d-md-block">
          <i class="fa-regular fa-star-half-stroke"></i>
          <i class="fa-regular fa-star"></i>
          <i class="fa-regular fa-star"></i>
          <i class="fa-regular fa-star"></i>
          <i class="fa-regular fa-star"></i>
          </div>
          <div>
          <i onclick="displayNewsDetails('${singleCetagory._id}')" class="fa-solid fa-arrow-right text-primary fs-5 me-4" data-bs-toggle="modal" data-bs-target="#newsDetails"></i>
          </div>
        </div>
        </div>
      </div>
    </div>
  
      `;
      newsContainer.appendChild(cards)
    });
    const footer = document.getElementById('footer');
    if (allNews.length !== 0) {
     footer.classList.remove('d-none');
    }
    else {
      footer.classList.add('d-none');
    }
    
    spinner(false);
  }
  const displayNewsDetails = news_id => {
    const url = `https://openapi.programming-hero.com/api/news/${news_id}`
    fetch(url)
      .then(res => res.json())
      .then(data => detailsOnModal(data.data[0]))
    .catch(error =>console.log(error))
  }
  const detailsOnModal = detail => {
    // console.log(detail)
    const modalBody = document.getElementById('modal-body');
    modalBody.innerHTML = `
    <img class="img-fluid" src="${detail.image_url}" alt="">
    <p class="mt-3">Published : ${detail.author.published_date}</p>
    <h5>${detail.title}</h5>
    <p class="mt-3">${detail.details}</p>
    <div class="d-md-none d-flex justify-content-between">
      <div>
        <i class="fa-regular fa-eye me-1"></i>
        <span class="fw-semibold">${detail.total_view ? detail.total_view : 'No data found'}</span>
      </div>
      <div>
        <i class="fa-regular fa-star-half-stroke"></i>
        <i class="fa-regular fa-star"></i>
        <i class="fa-regular fa-star"></i>
        <i class="fa-regular fa-star"></i>
        <i class="fa-regular fa-star"></i>
      </div>
    </div>
    `;
  }
  // spinner or loader
  const spinnerContainer = document.getElementById('spinner-container');
  const spinner = isLoading => {
    if (isLoading) {
      spinnerContainer.classList.remove('d-none');
    }
    else {
      spinnerContainer.classList.add('d-none');
      
    }
  }