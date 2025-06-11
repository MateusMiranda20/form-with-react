import './Myform.css'

const Myform = () => {
    return (
        <div>
            <h1>Forms</h1>
            <form>
                <div>
                    <label htmlFor="name">Name:</label>
                    <input type="text" id="name" name="name" required />
                </div>

                <div>
                    <label htmlFor="email">Email:</label>
                    <input type="email" id="email" name="email" required />
                </div>

                <div>
                    <label htmlFor="message">Message:</label>
                    <textarea id="message" name="message" rows="4" required></textarea> 
                </div>

                <button type="submit">Submit</button>
            </form>
        </div>
    )
}

export default Myform
// This is a simple form component in React that includes fields for name, email, and message.