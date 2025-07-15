# AWS-Connect-Addons

## Disclaimer

This unpacked extension **no longer runs its code directly from this GitHub repo or any hosted branch**.

Originally, the goal was to make updates easier to distribute by hosting the JavaScript code in the repo and having the extension load it directly from there. However, due to Content Security Policy (CSP) restrictions in Amazon Connect, this is no longer possible.

Now, **all code is included locally** within the extension package itself. You will need to manually update the extension files to receive new features or fixes.

> **Note:** The extension saves all data to local storage and is not tied to your AWS account. If you switch browsers or clear browsing data, you may need to reconfigure your settings.

---

## 💻 Using the Unpacked Extension

1. Download and unzip the repo.
2. Place the folder (`AWS-Connect-Addons-main`) somewhere convenient — **do not move it after adding it to your browser**, or the extension will break.
3. Open a Chromium-based browser (e.g., Chrome, Edge, Brave) and navigate to `chrome://extensions` or your browser’s extensions page.
4. Enable **Developer Mode** (toggle in the top right).
5. Click **Load unpacked**.
6. Navigate to your `AWS-Connect-Addons-main` folder and click **Select**.
7. Done! Reload your AWS Connect pages to see the changes in effect.

> **Updating:** When updates are pushed to GitHub, you will need to manually pull or download the latest files, and then reload the extension and affected AWS pages.

---

## ⚙️ Current Add-ons

- ✅ **Customizable Sub-Second Refresh** for the AWS Connect Real-Time Metrics page, with auto-pause on button interaction. (Settings save automatically.)
- 🌙 **Dark mode and theme toggle switch** (under **Actions**) for the AWS Connect Real-Time Metrics page. (Settings save automatically.)
- 🕒 **Auto-ClockOut setting** on the AWS Softphone page, allowing you to automatically set yourself to *Offline* at a configured time. (Settings save automatically.)

---

## ✉️ Feedback & Contributions

Feel free to fork or suggest improvements via pull requests. You can also open an issue if you encounter any problems.
