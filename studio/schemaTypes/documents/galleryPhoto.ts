import {defineField, defineType} from 'sanity'

export const galleryPhoto = defineType({
  name: 'galleryPhoto',
  title: 'Gallery Photo',
  type: 'document',
  fields: [
    defineField({
      name: 'image',
      type: 'image',
      options: {hotspot: true},
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'alt',
      title: 'Alt text',
      type: 'string',
      description: 'Plain description of the photo for screen readers — not a caption, nothing is shown on top of it in the grid.',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'orientation',
      type: 'string',
      description: 'Controls the crop in the masonry gallery grid.',
      options: {
        list: [
          {title: 'Tall (3:4)', value: 'tall'},
          {title: 'Wide (4:3)', value: 'wide'},
        ],
        layout: 'radio',
      },
      initialValue: 'wide',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'order',
      type: 'number',
      description: 'Position in the full /gallery grid. Lower numbers come first.',
      validation: (Rule) => Rule.integer(),
    }),
    defineField({
      name: 'featuredOnHome',
      title: 'Show on homepage gallery teaser',
      type: 'boolean',
      description: 'The homepage shows 3 curated photos with an event label — turn this on for those.',
      initialValue: false,
    }),
    defineField({
      name: 'eventLabel',
      title: 'Event label (homepage teaser only)',
      type: 'string',
      description: 'e.g. "doxa 2025" — shown as the caption on the homepage teaser tile only.',
      hidden: ({document}) => !document?.featuredOnHome,
      validation: (Rule) =>
        Rule.custom((value, context) => {
          const doc = context.document as {featuredOnHome?: boolean} | undefined
          if (doc?.featuredOnHome && !value) {
            return 'Required when "Show on homepage gallery teaser" is on.'
          }
          return true
        }),
    }),
    defineField({
      name: 'featuredOrder',
      title: 'Homepage teaser position',
      type: 'number',
      description: 'Left-to-right position among the 3 homepage teaser tiles.',
      hidden: ({document}) => !document?.featuredOnHome,
      validation: (Rule) => Rule.integer(),
    }),
  ],
  preview: {
    select: {title: 'alt', subtitle: 'eventLabel', media: 'image'},
  },
  orderings: [
    {
      name: 'orderAsc',
      title: 'Gallery order',
      by: [{field: 'order', direction: 'asc'}],
    },
  ],
})
