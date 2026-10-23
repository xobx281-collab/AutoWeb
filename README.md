# NOIR AUTOMOTIVE

A cinematic, monochromatic showroom for exceptional Chinese luxury and performance vehicles, built with Next.js, TypeScript, React Three Fiber and GSAP.

## Run locally

1. Install Node.js 20 or newer from https://nodejs.org.
2. Download or clone this repository.
3. In the project folder run `npm install`, then `npm run dev`.
4. Open http://localhost:3000.

No API keys or environment variables are required.

## Deploy to Vercel

1. Sign in at https://vercel.com with GitHub.
2. Choose **Add New → Project** and import `xobx281-collab/AutoWeb`.
3. Keep the detected Next.js framework and default build settings.
4. Select **Deploy**. Vercel installs dependencies and builds the site automatically.

A deployment is not considered live until Vercel reports success and provides a URL.

## 3D and image assets

The hero includes a genuine React Three Fiber scene with procedural architectural lighting and an abstract sculptural vehicle form; it is not represented as an authentic Yangwang or other production-car model. A photographic fallback is provided for reduced-motion or unsupported WebGL environments. To feature an authentic production vehicle in true 3D, obtain a properly licensed GLB/GLTF model and place it under `public/models/`, then wire it into the scene component. Do not add models or images unless you have redistribution rights.

Photography currently uses remote Unsplash image URLs, so those images require a network connection. Replace them with licensed local assets in `public/images/` for the most reliable production delivery.

## Enquiries

The enquiry form validates fields in the browser and opens the visitor's email client with a prepared message. It does not transmit or store enquiries on a server. Update the contact email in `src/components/EnquiryForm.tsx` before launch.

## Verification

Run `npm run build` to verify a production build. This GitHub-connected environment can edit repository files but does not provide a local Node.js build/browser runtime, so compilation and visual browser checks must be run after cloning or through Vercel deployment.
