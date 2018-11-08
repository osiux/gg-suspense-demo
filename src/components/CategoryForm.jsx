import React from "react";

import Button from "gumdrops/Button";
import FormGroup from "gumdrops/FormGroup";
import Label from "gumdrops/FormGroupLabel";
import Select from "gumdrops/Select";

import { getCategories } from "../api/api";

class CategoryForm extends React.Component {
    state = {
        categories: [],
    };

    componentDidMount() {
        this._fetchCategories();
    }

    _fetchCategories = async () => {
        const categories = await getCategories();

        const mappedCategories = categories.reduce((acc, item) => {
            const category = {
                name: item.name,
                value: item.id,
            };

            return [...acc, category];
        }, []);

        this.setState({
            categories: mappedCategories,
        });
    };

    render() {
        return (
            <form onSubmit={this.props.onSubmit}>
                <FormGroup>
                    <Label text="Category" />
                    <div className="gds-form-group__input-group">
                        <Select
                            name="category"
                            className="gds-form-group__text-input--right-edge"
                            options={this.state.categories}
                        />

                        <Button
                            type="submit"
                            context="primary"
                            className="gds-button--button-cap"
                        >
                            Get Images
                        </Button>
                    </div>
                </FormGroup>
            </form>
        );
    }
}

export default CategoryForm;
