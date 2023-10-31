import connectMongoDB from "@/libs/mongodb";
import { Chore } from "@/models/chores";
import User from "@/models/users";

export default async function POST(req, res) {
   try{
  const { name, description, deadline, assignees } = await req.body;
  await connectMongoDB();

      
      const assigneesnames = await Promise.all(assignees.map(async (name) => {
        const user = await User.findOne({ name });
        return user ? user._id : null;
      }));
  
    
      const validAssignees = assigneesnames.filter((assignee) => assignee);
  
        
  const chore = await Chore.create({
          name: name,
          description: description,
          deadline: deadline,
          assignees: validAssignees
        });
  
        await chore.save();
  
        res.status(200).json({ message: "Chore created successfully" });
      } catch (error) {
        res.status(400).json({ error: "Error creating chore" });
      }
    }
      res.status(405).end();