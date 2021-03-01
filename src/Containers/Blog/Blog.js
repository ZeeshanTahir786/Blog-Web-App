import React, { Component } from 'react';
import axios from '../../axios';
import Post from '../../Components/Post/Post';
import FullPost from '../../Components/FullPost/FullPost';
import NewPost from '../../Components/NewPost/NewPost';
import classes from '../Blog/Blog.module.css';

class Blog extends Component {
    state = {
        post: [],
        selectedPostId: null,
        error: false,
    }
    componentDidMount() {
        axios.get('/posts')
            .then(response => {
                const posts = response.data.slice(0, 4);
                const updatedPost = posts.map(post => {
                    return {
                        ...post,
                        auther: 'Hafiz'
                    }
                })
                this.setState({ post: updatedPost })
            }).catch(error => {
                this.setState({ error: true });
            });
    }
    postSelectedHandler = (id) => {
        this.setState({ selectedPostId: id });
    }
    render() {
        let post = <p style={{ textAlign: 'center' }}>Something Went Wrong!</p>;
        if (!this.state.error) {
            post = this.state.post.map(post => {
                return <Post key={post.id}
                    title={post.title}
                    auther={post.auther}
                    clicked={() => this.postSelectedHandler(post.id)}
                />
            })
        }
        return (
            <div>
                <section className={classes.Posts}>
                    {post}

                </section>
                <section>
                    <FullPost id={this.state.selectedPostId} />
                </section>
                <section>
                    <NewPost />
                </section>
            </div>
        );
    }
}

export default Blog;