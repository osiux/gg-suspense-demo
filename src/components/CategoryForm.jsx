import React, { Suspense } from "react";

import Button from "gumdrops/Button";
import FormGroup from "gumdrops/FormGroup";
import Label from "gumdrops/FormGroupLabel";
import Select from "gumdrops/Select";
import LoadingDots from 'gumdrops/LoadingDots';

import { getCategories } from "../api/api";

class CategoryForm extends React.Component {
    state = {
        categories: [],
    };

    render() {
        const categories = getCategories();

        const mappedCategories = categories.reduce((acc, item) => {
            const category = {
                name: item.name,
                value: item.id,
            };

            return [...acc, category];
        }, []);

        return (
            <form onSubmit={this.props.onSubmit}>
                <FormGroup>
                    <Suspense fallback={<LoadingDots />}>
                        <Label text="Category" />
                        <div className="gds-form-group__input-group">
                            <Select
                                name="category"
                                className="gds-form-group__text-input--right-edge"
                                options={mappedCategories}
                            />

                            <Button
                                type="submit"
                                context="primary"
                                className="gds-button--button-cap"
                            >
                                Get Images
                            </Button>
                        </div>
                    </Suspense>
                </FormGroup>
            </form>
        );
    }
}

export default CategoryForm;
