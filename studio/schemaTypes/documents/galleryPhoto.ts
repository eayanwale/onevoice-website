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
      name: 'event',
      type: 'reference',
      to: [{type: 'event'}],
      description: 'Which event/category this photo belongs to. Choose "Rehearsal Moments" for casual rehearsal shots.',
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {title: 'alt', subtitle: 'event.name', media: 'image'},
  },
  orderings: [
    {
      name: 'orderAsc',
      title: 'Gallery order',
      by: [{field: 'order', direction: 'asc'}],
    },
  ],
})
