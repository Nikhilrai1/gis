export const formFieldsOptions = [
    { "label": "StringField", "value": "StringField" },
    { "label": "IntegerField", "value": "IntegerField" },
    { "label": "FloatField", "value": "FloatField" },
    { "label": "DateField", "value": "DateField" },
    { "label": "DateTimeField", "value": "DateTimeField" },
    { "label": "TimeField", "value": "TimeField" },
    { "label": "BooleanField", "value": "BooleanField" },
    { "label": "DropDown", "value": "DropDown" }
]

export const formFieldTypeToInputType = {
    "StringField": "text",
    "IntegerField": "number",
    "FloatField": "text",
    "DateField": "date",
    "DateTimeField": "datetime-local",
    "TimeField": "time"
}
