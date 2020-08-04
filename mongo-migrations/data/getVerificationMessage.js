module.exports = (to, from, link) => ({
    to,
    from,
    subject: 'Email Verification',
    text: 'Let`s confirm your email address',
    html: `<!DOCTYPE html>
    <html lang="en">
    
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
        <title>Document</title>
        <style>
            .container {
                margin: 0 auto;
                width: 80%;
                text-align: center;
                color: #4484c0;
            }
    
            .title,
            .lets-p {
                font-size: 2em;
                font-weight: bold;
            }
    
            .conf-p {
                font-size: 1em;
            }
    
            .conf-link {
                display: block;
                margin: 0 auto;
                width: 200px;
                height: 50px;
                text-decoration: none;
                background-color: #4484c0;
                border-radius: 5px;
            }
    
            .link-text {
                color: #fff;
                font-size: 1em;
                line-height: 50px;
            }
        </style>
    </head>
    
    <body>
        <div class="container">
            <h1 class="title">Welcome to Simple Contacts Api</h1>
            <p class="lets-p"> Let's confirm your email address =)</p>
            <p class="conf-p">By clicking on the following link, you are confirming your email address.</p>
            <a class="conf-link" href="${link}"><span class="link-text">Confirm Email Adress</span></a>
        </div>
    </body>
    
    </html>`
});
