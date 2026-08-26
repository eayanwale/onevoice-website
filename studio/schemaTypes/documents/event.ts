import {defineField, defineType} from 'sanity'

export const event = defineType({
  name: 'event',
  title: 'Event',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      type: 'string',
      description: 'e.g. "DOXA 2025", "In His Hands", "Rehearsal Moments".',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      options: {source: 'name'},
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'year',
      type: 'number',
      description:
        'Leave blank for evergreen categories like Rehearsal Moments — they show outside the year groups on the gallery page.',
    }),
    defineField({
      name: 'order',
      type: 'number',
      description: 'Position within its year group (or among evergreen categories if no year).',
      validation: (Rule) => Rule.integer(),
    }),
    defineField({
      name: 'coverImage',
      type: 'image',
      options: {hotspot: true},
      description: 'Used for the homepage gallery teaser tile when featured — leave blank otherwise.',
    }),
    defineField({
      name: 'lightroomUrl',
      title: 'Lightroom gallery link',
      type: 'url',
      description:
        'The full Adobe Lightroom share link for this event\'s photos, e.g. https://lightroom.adobe.com/shares/xxxx — visit an adobe.ly short link once and paste the resulting full lightroom.adobe.com address here, since short links can expire. The gallery page embeds this directly, so photos never need to be uploaded to Sanity.',
      validation: (Rule) => Rule.required().uri({scheme: ['http', 'https']}),
    }),
    defineField({
      name: 'featuredOnHome',
      title: 'Show on homepage gallery teaser',
      type: 'boolean',
      description: 'The homepage shows 4 curated events with a landscape cover photo — turn this on for those.',
      initialValue: false,
    }),
    defineField({
      name: 'featuredOrder',
      title: 'Homepage teaser position',
      type: 'number',
      description: 'Left-to-right position among the 4 homepage teaser tiles.',
      hidden: ({document}) => !document?.featuredOnHome,
      validation: (Rule) =>
        Rule.custom((value, context) => {
          const doc = context.document as {featuredOnHome?: boolean} | undefined
          if (doc?.featuredOnHome && value === undefined) {
            return 'Required when "Show on homepage gallery teaser" is on.'
          }
          return true
        }),
    }),
  ],
  preview: {
    select: {title: 'name', subtitle: 'year', media: 'coverImage'},
    prepare({title, subtitle, media}) {
      return {title, subtitle: subtitle ? String(subtitle) : 'evergreen', media}
    },
  },
  orderings: [
    {
      name: 'yearOrder',
      title: 'Year, then order',
      by: [
        {field: 'year', direction: 'asc'},
        {field: 'order', direction: 'asc'},
      ],
    },
  ],
})
