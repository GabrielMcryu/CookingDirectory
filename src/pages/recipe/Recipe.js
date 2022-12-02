import { useEffect, useState } from "react"
import { useParams, useHistory } from "react-router-dom"
import { useTheme } from "../../hooks/useTheme"
import { projectFirestore } from "../../firebase/config"

// style
import './Recipe.css'

export default function Recipe() {
    const { id } = useParams()
    const history = useHistory()
    const { mode } = useTheme()

    const [recipe, setRecipe] = useState(null)
    const [isPending, setIsPending] = useState(false)
    const [error, setError] = useState(false)

    useEffect(() => {
        if (error) {
            // redirect
            // history.goBack()
            setTimeout(() => {
                history.push('/')
            }, 2000)
        }

        setIsPending(true)

        const unsub = projectFirestore.collection('recipe').doc(id).onSnapshot((doc) => {
            if (doc.exists) {
                setIsPending(false)
                setRecipe(doc.data())
            } else {
                setIsPending(false)
                setError('Could not find that recipe')
            }
        })

        return () => unsub()
        
    }, [error, history, id])

    const handleClick = () => {
        projectFirestore.collection('recipe').doc(id).update({
            title: 'veg pie'
        })
    }

    return (
        <div className={`recipe ${mode}`}>
            {isPending && <p className="loading">Loading...</p>}
            {error && <p className="error">{error}</p>}
            {recipe && (
                <>
                    <h2 className="page-title">{recipe.title}</h2>
                    <p>Takes {recipe.cookingTime} to cook.</p>
                    <ul>
                        {recipe.ingredients.map(ing => <li key={ing}>{ing}</li>)}
                    </ul>
                    <p className="method">{recipe.method}</p>
                    <button onClick={handleClick}>Update me</button>
                </>
            )}
        </div>
    )
}
