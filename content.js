let link;

fetch('https://raw.githubusercontent.com/AlecMcCutcheon/AWS-Connect-Addons/Hosted-JS/Dyn%20Link.JSON')
  .then(response => response.text())
  .then(text => {
    link = JSON.parse(text).LINK;
    const script = document.createElement('script');
    script.src = link;
    document.body.appendChild(script);
  })
  .catch(error => {
    console.error('Error:', error);
  });
