import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { createCoffeeThunk, getCoffeeThunk, updateCoffeeThunk, updateImageThunk } from "../../redux/coffee";
import { createImage } from "../../redux/coffee";
import BeanBreak from "./BeanBreak";
import './CoffeeForm.css'

const ROASTS = ['Light', 'Medium', 'Dark', 'Espresso']
const SEED_IDS = ['1', '2', '3', '4', '5']

function CoffeeFormPage({ newCoffee }) {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { id } = useParams()
  const allCoffee = useSelector(state => state.coffee)
  const coffee = useSelector(state => state.coffee[id])
  const user = useSelector(state => state.session.user)

  const [name, setName] = useState('')
  const [price, setPrice] = useState(0.00)
  const [description, SetDescription] = useState('')
  const [roast, setRoast] = useState('Select-A-Roast')
  const [region, setRegion] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [valErrors, setValErrors] = useState({})
  const [image, setImage] = useState(null)
  const [disabled, setDisabled] = useState(false)

  useEffect(() => {
    async function getCoffee() {
      await dispatch(getCoffeeThunk(id))
    }
    getCoffee()
  }, [dispatch, id])

  useEffect(() => {
    if (coffee) {
      setName(coffee.name)
      setPrice(coffee.price)
      SetDescription(coffee.description)
      setRoast(coffee.roast)
      setRegion(coffee.region)
    }
  }, [coffee])


  useEffect(() => {
    const errors = {}
    if (name.length < 1) errors.name = 'Please provide a name for your coffee'
    if (name.length > 50) errors.name = 'Coffee names are limited to 50 characters'
    if (price < .01) errors.price = 'Please provide a valid price for your coffee'
    if (description.length < 30) errors.description = 'Please describe your coffee in more that 30 characters'
    if (description.length > 500) errors.description = 'Please describe your coffee in less than 500 characters'
    if (!ROASTS.includes(roast)) errors.roast = 'Please select a valid roast'
    if (region.length < 1) errors.region = 'Please provide the a region for your coffee'
    if (region.length > 50) errors.region = 'Regions are limited to 50 characters'
    if (!image && newCoffee) errors.image = 'Please select an image for your coffee!'
    setValErrors(errors)

  }, [name, price, description, roast, region, image, newCoffee])

  const handleUpdate = async (e) => {
    e.preventDefault()
    setSubmitted(true)

    if (Object.values(valErrors).length) return;
    const coffee = {
      name,
      description,
      roast,
      region,
      price
    }
    if (image) {
      const formData = new FormData()
      formData.append("image", image)
      formData.append("coffee_id", id)
      const imgId = allCoffee[id].coffeeImages[0].id
      await dispatch(updateImageThunk(imgId, formData))
    }

    await dispatch(updateCoffeeThunk(id, coffee))
    navigate(`/coffees/${id}`)
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitted(true);
    if (Object.values(valErrors).length) return;
    const coffee = {
      name,
      description,
      roast,
      region,
      price
    }
    const newCoffee = await dispatch(createCoffeeThunk(coffee))
    const formData = new FormData()

    formData.append("image", image)
    formData.append("coffee_id", newCoffee.id)
    await dispatch(createImage(formData))
    navigate(`/coffees/${newCoffee.id}`)
  }

  useEffect(() => {
    if (SEED_IDS.includes(id)) setDisabled(true);
  }, [id])

  const autoFill = () => {
  setName('random coffee')
  setPrice(19.99)
  SetDescription('The FitnessGram™ Pacer Test is a multistage aerobic capacity test that progressively gets more difficult as it continues. The 20 meter pacer test will begin in 30 seconds. Line up at the start. The running speed starts slowly, but gets faster each minute after you hear this signal.')
  setRoast('Medium')
  setRegion('silly goose town')
  // setImage()
  }

  if (!newCoffee && user?.id !== coffee?.ownerId) {
    return <h2>Forbidden</h2>
  }

  return (
    <div className="form-outer">
      <div className="form-container">
        {newCoffee ? <h2>Create a New Coffee</h2> : <h2>Update {coffee.name}</h2>}
        <hr />
        <form className="form">
          <div className="form-div">
            <p>Please enter the name of your coffee</p>
            <input
              type="text"
              name='name'
              placeholder="Coffee Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            {submitted ? <p className="errors">{valErrors.name}</p> : <BeanBreak />}
          </div>
          <div className="form-div">
            <p> Give a short description of your coffee <br />
              (this might include flavor profiles or
              other interesting facts about
              your product!)
            </p>
            <textarea
              name="description"
              placeholder="Description"
              value={description}
              onChange={(e) => SetDescription(e.target.value)}
            />
            {submitted ? <p className="errors">{valErrors.description}</p> : <BeanBreak />}
          </div>
          <div className="form-div">
            <p>Select a roast for the coffee</p>
            <select
              name="roast"
              value={roast}
              onChange={(e) => setRoast(e.target.value)}>
              <option value='Select-A-Roast'>Select-A-Roast</option>
              <option value='Light'>Light</option>
              <option value="Medium">Medium</option>
              <option value="Dark">Dark</option>
              <option value="Espresso">Espresso</option>
            </select>
            {submitted ? <p className="errors">{valErrors.roast}</p> : <BeanBreak />}
          </div>
          <div className="form-div">
            <p>What region was the coffee grown in?</p>
            <input
              type="text"
              name="region"
              placeholder="Region"
              value={region}
              onChange={(e) => setRegion(e.target.value)}
            />
            {submitted ? <p className="errors">{valErrors.region}</p> : <BeanBreak />}
          </div>
          <div className="form-div">
            <p>Enter a price for your coffee</p>
            <input
              type="number"
              name="price"
              value={price}
              onChange={(e) => setPrice(e.target.value)} />
            {submitted ? <p className="errors">{valErrors.price}</p> : <BeanBreak />}
          </div>
          <div className="form-div">
            <div className='inner-picture-div'>
              <div>
                <p>Choose an image for your coffee</p>
                {disabled && <p>File uploads are disabled for demo-coffees if you would like to test image updates please create a new coffee!</p>}

                <input
                  disabled={disabled}
                  type="file"
                  accept="image/*"
                  onChange={(e) => setImage(e.target.files[0])}
                />

              </div>
              <div className="picture-container">
              {image && <img src={URL.createObjectURL(image)} alt="preview" className='form-image-container' style={{ height: '5rem' }} />}
              </div>
            </div>
            {submitted && newCoffee ? <p className="errors">{valErrors.image}</p> : <BeanBreak />}
          </div>
          {newCoffee ? <button onClick={handleSubmit}>Create Coffee</button> : <button onClick={handleUpdate}>Update Coffee</button>}
        </form>
          {newCoffee ? <button onClick={autoFill}> auto fill</button> : null}
      </div>
    </div>
  )
}

export default CoffeeFormPage;
