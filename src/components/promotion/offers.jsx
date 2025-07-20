export default function Offers () {
    return(
         <div className="hidden md:flex bg-white border border-orange-600 text-yellow-900 px-4 py-2 rounded-xl shadow-md items-center justify-center gap-2 text-sm font-semibold mx-auto max-w-screen-md flex-wrap">
          <span>💳 Exclusive Offers on HDFC & Axis Bank Cards – Get Bonus Miles!</span>
          <img
            src="https://media.assettype.com/TNIE%2Fimport%2F2021%2F8%2F2%2Foriginal%2FHDFC.jpg?w=480&auto=format%2Ccompress&fit=max"
            alt="HDFC"
            className="h-6"
          />
          <img
            src="https://assets.upstox.com/content/assets/images/cms/202443/Axis%20Bank%20Ltd.webp"
            alt="Axis"
            className="h-6"
          />
        </div>

    )
}