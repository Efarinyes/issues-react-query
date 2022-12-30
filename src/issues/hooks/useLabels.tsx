
import { useQuery } from "@tanstack/react-query"
import { githubApi } from "../../api/githupApi"
import { Label } from "../interfaces/label"
import { sleep } from '../../helpers/sleep';

const getLabels = async():Promise<Label[]> => {
    await sleep(2)
    const { data } = await githubApi.get<Label[]>('/labels?per_page=100', {
       headers: {
        Authorization: null
       }
       
    })
    return data
}

export const useLabels = () => {
    const labelsQuery = useQuery(
        ['labels'],
        getLabels,
        {
            // staleTime: 1000 * 60 * 60
            placeholderData: [
                {
                    id: 725156255,
                    node_id: "MDU6TGFiZWw3MjUxNTYyNTU=",
                    url: "https://api.github.com/repos/facebook/react/labels/good%20first%20issue%20(taken)",
                    name: "good first issue (taken)",
                    color: "b60205",
                    default: false,
                },
                {
                    id: 760751171,
                    node_id: "MDU6TGFiZWw3NjA3NTExNzE=",
                    url: "https://api.github.com/repos/facebook/react/labels/Difficulty:%20challenging",
                    name: "Difficulty: challenging",
                    color: "f2687c",
                    default: false,
                },
                {
                    id: 196858374,
                    node_id: "MDU6TGFiZWwxOTY4NTgzNzQ=",
                    url: "https://api.github.com/repos/facebook/react/labels/CLA%20Signed",
                    name: "CLA Signed",
                    color: "e7e7e7",
                    default: false,
                    
                }
            ]
        }
    )
    
    return labelsQuery
}