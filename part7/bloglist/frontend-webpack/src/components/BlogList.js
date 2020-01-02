import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Table } from 'semantic-ui-react';

const BlogList = (props) => {
    BlogList.propTypes = {
        displayedBlogs: PropTypes.array.isRequired
    };
    return (
        <Table striped>
            <Table.Body>
                {props.displayedBlogs.map(blog =>
                    <Table.Row key={blog.id} >
                        <Table.Cell width={10}>
                            <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
                        </Table.Cell>
                    </Table.Row>
                )}
            </Table.Body>
        </Table>
    );
};

const getDisplayedBlogs = (blogsList) => {
    let newList = [...blogsList];
    return newList.sort((blogA, blogB) => (blogA.likes < blogB.likes) ? 1 : -1);
};

const mapStateToProps = (state) => {
    return {
        blogs: state.blogs,
        displayedBlogs: getDisplayedBlogs(state.blogs),
    };
};

export default connect(mapStateToProps, null)(BlogList);