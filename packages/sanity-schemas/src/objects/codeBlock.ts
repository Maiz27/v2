import {defineArrayMember} from 'sanity'

const languageAlternatives = [
  {title: 'Typescript', value: 'typescript'},
  {title: 'Javascript', value: 'javascript'},
  {title: 'HTML', value: 'html'},
  {title: 'CSS', value: 'css'},
  {title: 'Java', value: 'java'},
  {title: 'Kotlin', value: 'kotlin'},
  {title: 'Dart', value: 'dart'},
  {title: 'Jsx', value: 'jsx'},
  {title: 'Tsx', value: 'tsx'},
  {title: 'GROQ', value: 'groq'},
  {title: 'Yaml', value: 'yaml'},
]

export default defineArrayMember({
  title: 'Code',
  name: 'code',
  type: 'code',
  options: {
    language: 'javascript',
    languageAlternatives,
    withFilename: true,
  },
})
