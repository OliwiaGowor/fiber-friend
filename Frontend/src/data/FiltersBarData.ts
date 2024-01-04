import { NeedleworkType, ResourceType } from "../DTOs/Enums"
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
        name: "needleworkType",
        options: [
            {
                name: "Knitting",
                value: NeedleworkType.knitting
            },
            {
                name: "Crochet",
                value: NeedleworkType.crochet
            },
            {
                name: "Other",
                value: NeedleworkType.other
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
        name: "needleworkType",
        options: [
            {
                name: "Knitting",
                value: NeedleworkType.knitting
            },
            {
                name: "Crochet",
                value: NeedleworkType.crochet
            },
            {
                name: "Other",
                value: NeedleworkType.other
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
        name: "resourceType",
        options: [
            {
                name: "Yarns",
                value: ResourceType.yarn
            },
            {
                name: "Tools",
                value: ResourceType.tool
            },
            {
                name: "Others",
                value: ResourceType.other
            },
        ]
    }
]