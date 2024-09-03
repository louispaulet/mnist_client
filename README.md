# 🧠 MNIST Client

**Client-side MNIST Inference with TensorFlow.js**  
No backend required! Experience real-time digit recognition directly in your browser.

### 🌐 [Live Demo](https://mnist.thefrenchartist.dev/)

---

## 🚀 Run the Prototype

To get started quickly, you can run a simple HTTP server and open the test page:

```bash
$ python -m http.server 8000
```

Then, open `test.html` in your browser.

## 🛠️ Run the Website

1. **Navigate to the project directory:**

    ```bash
    $ cd mnist-client
    ```

2. **Run the website locally:**

    ```bash
    $ npm run dev
    ```

3. **Deploy to your custom domain:**

    Update the `CNAME` file and run:

    ```bash
    $ npm run deploy
    ```

### 🧭 Navigation

The website uses a `HashRouter` to handle navigation within the available subdomains, preventing conflicts with GitHub Pages routing.
