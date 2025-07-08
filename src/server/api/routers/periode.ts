import {createTRPCRouter, adminProcedure, protectedProcedure} from "@/server/api/trpc";

export const periodeRouter = createTRPCRouter({
    getPeriodes: adminProcedure.query(async ({ctx}) => {
        const periode = await ctx.db.periode.findMany();

        return periode ?? null;
    }),
    getActivePeriode: protectedProcedure.query(async ({ctx}) => {
        const periode = await ctx.db.periode.findFirst({
            where: {
                isActive: true,
            }
        })

        return periode ?? null;
    })
});
