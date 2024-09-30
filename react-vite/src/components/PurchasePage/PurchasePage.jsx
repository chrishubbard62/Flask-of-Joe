import coffeeCup from '/checkoutpage.jpg'
import './PurchasePage.css'

export default function PurchasePage() {
  return <div className='purchase-container'>
    <img className="coffee-cup"src={coffeeCup} alt="hot cup of coffee" />
    <h2>Thank You for your Purchase!</h2>
  </div>
}
