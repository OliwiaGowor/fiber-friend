import { categories } from "./Categories"

export const projectsFilters = [
    {
        name: "Status",
        options: [
            {
                name: "Active",
                value: "active"
            },
            {
                name: "Completed",
                value: "completed"
            }
        ]
    },
    {
        name: "Type",
        options: [
            {
                name: "Knitting",
                value: "knitting"
            },
            {
                name: "Crochet",
                value: "crochet"
            },
            {
                name: "Other",
                value: "other"
            },
        ]
    },
    {
        name: "Category",
        options: categories
    },
]

export const patternsFilters = [
    {
        name: "Status",
        options: [
            {
                name: "Active",
                value: "active"
            },
            {
                name: "Completed",
                value: "completed"
            }
        ]
    },
    {
        name: "Type",
        options: [
            {
                name: "Knitting",
                value: "knitting"
            },
            {
                name: "Crochet",
                value: "crochet"
            },
            {
                name: "Other",
                value: "other"
            },
        ]
    },
    {
        name: "Category",
        options: categories
    },
]

export const resourcesFilters = [
    {
        name: "Type",
        options: [
            {
                name: "All",
                value: "all"
            },
            {
                name: "Yarns",
                value: "yarns"
            },
            {
                name: "Tools",
                value: "tools"
            },
            {
                name: "Others",
                value: "others"
            },
        ]
    }
]