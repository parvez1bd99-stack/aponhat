// image-utils.js
// ছবি ছোট করে (সর্বোচ্চ ~৫০০px, প্রায় ১০০ KB এর নিচে) JPEG ডাটা-কোড বানায়।

export const MAX_IMAGES = 3;

export function compressImage(file, maxSize = 500, quality = 0.7) {
    return new Promise((resolve, reject) => {
        if (!file.type.startsWith("image/")) return reject(new Error("শুধু ছবি ফাইল দিন"));

        const url = URL.createObjectURL(file);
        const img = new Image();

        img.onload = () => {
            URL.revokeObjectURL(url);
            let size = maxSize, q = quality, out = "";

            // বড় হলে মান ও মাপ একটু একটু কমিয়ে আবার চেষ্টা করবে
            for (let i = 0; i < 6; i++) {
                const scale = Math.min(1, size / Math.max(img.width, img.height));
                const w = Math.max(1, Math.round(img.width * scale));
                const h = Math.max(1, Math.round(img.height * scale));
                const canvas = document.createElement("canvas");
                canvas.width = w;
                canvas.height = h;
                const ctx = canvas.getContext("2d");
                ctx.fillStyle = "#ffffff"; // PNG এর স্বচ্ছ অংশ সাদা হবে
                ctx.fillRect(0, 0, w, h);
                ctx.drawImage(img, 0, 0, w, h);
                out = canvas.toDataURL("image/jpeg", q);
                if (out.length <= 140000) break; // প্রায় ১০০ KB
                q = Math.max(0.4, q - 0.1);
                size = Math.round(size * 0.85);
            }
            resolve(out);
        };

        img.onerror = () => {
            URL.revokeObjectURL(url);
            reject(new Error("ছবিটি পড়া যায়নি"));
        };
        img.src = url;
    });
}
