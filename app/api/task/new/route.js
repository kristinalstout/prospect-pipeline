import Task from "@models/task";
import { connectToDB } from "@utils/database";

export const POST = async (request) => {
    const { userId, task, dueDate, priority, assignee, customer, note } = await request.json();

    try {
        await connectToDB();
        const newTask = new Task({ creator: userId,task, dueDate, priority, assignee, customer, note});

        await newTask.save();
        return new Response(JSON.stringify(newTask), { status: 201 })
    } catch (error) {
        return new Response("Failed to create a new task", { status: 500 });
    }
}