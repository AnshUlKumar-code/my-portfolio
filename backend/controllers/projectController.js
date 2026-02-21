import zod from "zod"
import projectModel from "../model/Project.js"

const getProjectsController = async (req, res) => {
    try {
        const projects = await projectModel.find().sort({ order: 1 });
        if (!projects) {
            return res.status(404).json({
                message: "No projects found"
            })
        }

        res.status(200).json({
            projects: projects
        })

    } catch (error) {
        res.status(500).json({
            message: error.message
        })

    }
}

const createProjectController = async (req, res) => {
    try {
        const { title, description, shortDescription, category, platform, technologies, githubLink, liveLink, featured } = req.body;
        const objectSchema = zod.object({
            title: zod.string(),
            description: zod.string(),
            shortDescription: zod.string(),
            category: zod.string(),
            platform: zod.string(),
            technologies: zod.array(zod.string()),
            githubLink: zod.string().url(),
            liveLink: zod.string().url(),
            featured: zod.boolean()
        })
        const validationResult = objectSchema.safeParse({ title, description, shortDescription, category, platform, technologies, githubLink, liveLink, featured })
        if (!validationResult.success) {
            return res.status(400).json({
                message: "Validation failed",
                errors: validationResult.error.errors
            })
        }

        const newProject = new projectModel({
            title,
            description,
            shortDescription,
            category,
            platform,
            technologies,
            githubLink,
            liveLink,
            featured
        })

        const savedProject = await newProject.save();
        res.status(201).json({
            message: "Project created successfully",
            project: savedProject
        })
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

const deleteProjectController = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedProject = await projectModel.findByIdAndDelete(id);
        if (!deletedProject) {
            return res.status(404).json({
                message: "Project not found"
            });
        }
        res.status(200).json({
            message: "Project deleted successfully",
            project: deletedProject
        });
    } catch (error) {

    }
}

const updateProjectController = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedProject = await projectModel.findByIdAndUpdate(
            id,
            { $set: req.body },
            { new: true, runValidators: true }
        );
        if (!updatedProject) {
            return res.status(404).json({
                message: "Project not found"
            });
        }
        res.status(200).json({
            message: "Project updated successfully",
            project: updatedProject
        });
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}


const getSingleProjectController = async (req, res) => {
    try {
        const { id } = req.params;
        const project = await projectModel.findById(id);        
        if (!project) {
            return res.status(404).json({
                message: "Project not found"
            });
        }
        res.status(200).json({
            project: project
        });
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

export { getProjectsController, createProjectController, deleteProjectController, updateProjectController, getSingleProjectController }