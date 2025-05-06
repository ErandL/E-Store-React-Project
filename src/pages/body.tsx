import "../index.css"
import Banner from "../components/banner"
import SmallerBanner from "../components/smaller-banner"
import BrowseByCategory from "../components/category"
import NewArrival from "../components/newArrival"
import ProductsCarousel from "../components/productsCarousel"

export default function Body() {
  return (
    <>
      <Banner></Banner>
      <SmallerBanner></SmallerBanner>
      <BrowseByCategory></BrowseByCategory>
      <NewArrival></NewArrival>
      <ProductsCarousel></ProductsCarousel>
    </>
  )
}
