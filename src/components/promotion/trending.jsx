export default function Trending () {

  const trendingData = [
  {
    route: "Mumbai → Dubai",
    airline: "Emirates",
    price: "₹18,999",
    logo: "https://thumbs.dreamstime.com/b/aerial-view-burj-khalifa-dubai-downtown-skyline-fountain-united-arab-emirates-uae-financial-district-business-area-171679350.jpg",
  },
  {
    route: "Delhi → London",
    airline: "British Airways",
    price: "₹42,500",
    logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQSgCuIJ7u1akapg_oTUETWMgshpXdIaABugw&s",
  },
  {
    route: "Bangalore → Singapore",
    airline: "Singapore Airlines",
    price: "₹21,200",
    logo: "https://geographical.co.uk/wp-content/uploads/singapore-1.jpg",
  },
  {
    route: "Chennai → Frankfurt",
    airline: "Lufthansa",
    price: "₹37,800",
    logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRcmUgNxNWj1ionLafgnxmg2MpvyyntLdVGiA&s",
  },
];

    return(
      <section className="py-6 px-4 bg-gray-50">
      <div className="flex justify-center align-center text-3xl text-black pb-6" style={{ fontFamily: "Lobster, cursive" }}>
        Hot Trending Flight Routes & Airlines
      </div>

      <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 max-w-7xl mx-auto px-4">
  {trendingData.map((item, index) => (
    <div
      key={index}
      className="group relative h-64 rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg hover:border-gray-200 transition-all duration-300 hover:-translate-y-1"
    >
      {/* Background Image */}
      <img 
        src={item.logo} 
        alt={item.airline} 
        className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" 
      />
      
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-30 group-hover:bg-opacity-40 transition-all duration-300"></div>
      
      {/* Content in Right Corner */}
      <div className="absolute top-4 right-4 text-right">
        {/* Route */}
        <h3 className="text-xl font-bold text-white mb-1 tracking-tight drop-shadow-lg">
          {item.route}
        </h3>
        
        {/* Airline Name */}
        <p className="text-sm font-medium text-white opacity-90 mb-3 uppercase tracking-wide drop-shadow">
          {item.airline}
        </p>
        
        {/* Price */}
        <span className="text-2xl font-bold text-white bg-black bg-opacity-50 px-3 py-1 rounded-full drop-shadow-lg">
          {item.price}
        </span>
      </div>
    </div>
  ))}
</div>

      <div className="bg-white pt-24 px-4">
        <div className="text-center text-3xl text-black pb-6" style={{ fontFamily: "Lobster, cursive" }}>
          Our Partners
        </div>
     
       <div className="flex justify-center gap-12 items-center flex-wrap">
         <div className="flex flex-col items-center">
           <img
             src="https://cdn.shopify.com/s/files/1/0558/6413/1764/files/Airbnb_Logo_Design_History_Evolution_0_1024x1024.jpg?v=1692808408"
             alt="Airbnb"
             className="w-32 h-auto transition-transform duration-300 hover:scale-105"
           />
         </div>
     
         <div className="flex flex-col items-center">
           <img
             src="https://logos-world.net/wp-content/uploads/2020/11/IRCTC-Symbol.png"
             alt="IRCTC"
             className="w-32 h-auto transition-transform duration-300 hover:scale-105"
           />
         </div>
       </div>
     </div>
     

     </section>
    )
}