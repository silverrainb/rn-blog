import createDataContext from "./createDataContext"

const blogReducer = (state, action) => {
    switch (action.type) {
        case 'add':
            return [...state, {
                id: Math.floor(Math.random() * 99999),
                title: action.payload.title,
                content: action.payload.content
            }]
        case 'edit':
            return state.map((blogPost) => {
                blogPost.id === action.payload.id
                    ? action.payload
                    : blogPost
            })

        case 'delete':
            return state.filter((blogPost) => blogPost.id !== action.payload)
        default:
            return state
    }
}
const addBlogPost = (dispatch) => {
    return (title, content, callback) => {
        try{
            dispatch({type: 'add', payload: {title, content}})
            if(callback) callback();
        } catch (e) {
            console.log(e)
        }
    }
}

const editBlogPost = (dispatch) => {
    return (id, title, content, callback) => {
        dispatch({type: 'edit', payload: {id, title, content}})
        // callback ? callback() : null
        if (callback) {
            callback();
        }
    }
}

const deleteBlogPost = (dispatch) => {
    return (id) => {
        dispatch({type:'delete', payload: id})
    }
}

export const {Context, Provider} = createDataContext(
    blogReducer,
    {addBlogPost, deleteBlogPost, editBlogPost},
    [{title: 'Test Post', content: 'This is Test Post.', id: 1}],
)

/** useReducer */
// const BlogContext = React.createContext()
//
// const blogReducer = (state, action) => {
//     switch (action.type){
//         case 'create':
//             return [...state, {title: `Blog Post #${state.length + 1}`}]
//         default:
//             return state
//     }
// }
// export const BlogProvider = ({ children }) => {
//     const [blogPosts, dispatch] = useReducer(blogReducer, [])
//
//     const addBlogPost = () => {
//         dispatch({type: 'create'})
//     }
//
//     return <BlogContext.Provider value={{data: blogPosts, addBlogPost}}>
//         {children}
//     </BlogContext.Provider>
// }
//
// export default BlogContext
/** useState hook*/
// export const BlogProvider = ({ children }) => {
//     const [blogPosts, setBlogPosts] = useState([])
//
//     const addBlogPost = () => {
//         setBlogPosts([...blogPosts,{ title: `Blog Post #${blogPosts.length + 1}`}])
//     }
//
//     // const editBlogPost = () => {}
//     // const deleteBlogPost = () => {}
//
//     return <BlogContext.Provider value={{data: blogPosts, addBlogPost}}>
//         {children}
//     </BlogContext.Provider>
// }
//
// export default BlogContext
