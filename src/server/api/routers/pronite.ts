import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";

export const proniteRouter = createTRPCRouter({
  createPronite: publicProcedure
    .input(
      z.object({
        max_capacity: z.number(),
        ticket_price: z.number(),
        begin_time: z.date() ,
        description:z.string(),
        venue:z.string(),
        end_time:z.null(),
        name:z.string(),
      }),
    )
    .mutation(async ({ ctx, input })=> {
        
        const eventDetails=await ctx.db.eventDetails.create({
          data:
          {
            begin_time:new Date(input.begin_time),
            end_time:new Date(),
            name:input.name,
            description:input.description,
            venue:input.venue,
          }

        });
        return ctx.db.pronite.create({
          data: {
            proniteDetailsId:eventDetails.id,
            max_capacity: input.max_capacity,
            ticket_price: input.ticket_price,
            createdAt: new Date(), 
            updatedAt: new Date(), 
          },
        });
        
      }),
  

    

   getPronite: publicProcedure
   
    .query(async ({ ctx }) => {
      const pronites = await ctx.db.pronite.findMany({
      
      
       include:{ proniteDetails:true}
      });
      return pronites;
      
    })
  })
 