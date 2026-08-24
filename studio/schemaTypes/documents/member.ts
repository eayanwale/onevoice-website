import {defineField, defineType} from 'sanity'

export const member = defineType({
  name: 'member',
  title: 'Member',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'role',
      type: 'string',
      description: 'Optional — the roster card shows the name alone until this is set.',
    }),
    defineField({
      name: 'tagline',
      type: 'string',
      description: 'A short personal line in their own words — shown as a pull-quote when the card expands.',
    }),
    defineField({
      name: 'bio',
      type: 'text',
      rows: 6,
      description: 'Their own words — favorite worship song, a fun fact, why they’re part of OneVoice. Separate paragraphs with a blank line.',
    }),
    defineField({
      name: 'photo',
      type: 'image',
      options: {hotspot: true},
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'order',
      type: 'number',
      description: 'Left-to-right position in the roster strip. Lower numbers come first.',
      validation: (Rule) => Rule.integer(),
    }),
  ],
  preview: {
    select: {title: 'name', subtitle: 'role', media: 'photo'},
  },
  orderings: [
    {
      name: 'orderAsc',
      title: 'Roster order',
      by: [{field: 'order', direction: 'asc'}],
    },
  ],
})
