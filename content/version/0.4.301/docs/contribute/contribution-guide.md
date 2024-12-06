---
title: "Contribution Guide"
draft: false
---

# Oakestra Contribution guide  

Oakestra's codebase is open-source on GitHub and open to **external** contributors as well. The purpose of this guide is to help the developer contribute in such a way that both people directly involved in Okaestra and people outside the research group can follow what happens within the project. 

## Issues

Each contribution starts from an issue on the corresponding repository. E.g., Are you willing to update the front end? Open an issue on the dashboard repository. 

The issue can be of two kinds: **Proposal** or **Bug** 

Template for **Proposal** issues:



> # Short
> Short description of what you're proposing. Max 2 lines. Highlight if this is something new or maybe you're willing to change some specific behavior. 
>
> # Proposal
> Description of the modification you're proposing. You can have references, links, and images. Please be very specific here. External contributors must be able to understand the context and the goal of the proposal.
>
> # Ratio
> Short description of why this is important
>
> # Impact
> Describe the components that potentially need to be touched. E.g., Root service manager, Cluster scheduler, etc. 
>
> # Development time
> The expected time required to complete the development of this proposal 
>
> # Status
> Describe the current status of this proposal. E.g., looking for feedback, searching for a solution, development, and testing. Try to be concise but descriptive.
>
> # Checklist
> 
> - [ ] Discussed
> - [ ] Documented
> - [ ] Implemented
> - [ ] Tested

	
Template for **Bug** issues:

>
> # Short
> Short description of the bug you noticed.
> 
> # Proposal
> Deeper description of the bug.
> 
> # Solution
> Eventually, propose a solution.
> 
> # Status
> Describe the current status of this proposal. E.g., looking for feedback, searching for a solution, development, testing. Try to be concise but descriptive
>
> # Checklist 
> 
> - [ ] Discussed
> - [ ] Solved
> - [ ] Tested
## Issue names

Try to be concise and informative. Here some good ✅ and bad ❌ examples to give you an idea.

- Scheduling  ❌
- Integration of LDA to Cluster Scheduler ✅
- Frontend edit ❌
- Frontend cluster management panel ✅
- I think we need to replace the login token with a new JWT token ❌
- JWT API authentication ✅

## Contribution steps

- Open an Issue or Pick one
- Assign it to yourself, or ask for it. 
- Fork the develop branch and detach a branch named after the issue
- When the issue is solved, tested and discussed in your fork, propose a PR towards the develop branch. Don't forget to link the PR to the issue using the proper [keywords](https://docs.github.com/en/issues/tracking-your-work-with-issues/linking-a-pull-request-to-an-issue)
- If necessary, update the [documentation](https://github.com/oakestra/documentation) as well using the same procedure
- Make sure that the PR passes all the automated tests.
- Add the maintainers as Reviewers.
- Don't disappear, try to stay active in the discussion section until required. 

## Multi-repo contributions

The codebase is split into multiple repositories. Sometimes a single contribution might need to span across some of them in parallel. This is where things get tricky. 

Contributions spanning multiple repositories are difficult to track and require careful management. 

Please open multiple issues, one for each repository, and cross-link them. Each issue discusses only the modification required on that specific repository but links to the issues embedding the work required elsewhere. 

As a general rule, is better to perform the merges in parallel.
Make sure to open the pull requests together and cross-link the other pull requests between them.

## Your work into Issues
 
Try to find out the single tasks of your workflow and open up the corresponding issues accordingly. 
Breaking down the work into issues makes it easier to merge and test the features.  

**N.b.** Always assign the issue to yourself and maybe indicate if this is part of a specific milestone, thesis, or guided research. 

## Discuss with the community 

With the growth in the interest for Oakestra, many people are onboarding. By collaborating on this project, you have the chance to ask for their ideas as well.

Try to write the issues in a clear way so that anyone might be able to fit in and contribute. 
Then keep an eye on the issue's comment section and add the label "help needed" if required. 

## Versioning

The project version is written in the file `version.txt` 
Make sure to update this file accordingly. 

N.b. The versions are amanged only by this file. NEVER CREATE A VERSION TAG MANUALLY. 

## Release images

An accepted pull-request towards main creates a release TAG corresponding to the version in `version.txt`. 
The release images will be created automatically by the git workflows. 

- If a release tag exist already, will not be replaced. You need to increase the version number! 
- If you get an artifact creation error, most likely the release was not yet created on github. Please create a new release for the new tag and re-run the failed jobs. 

## Alpha images

An accepted pull-request towards develop creates an alpha TAG corresponding to the version in `version.txt` with the `alpha-` prefix. If the tag exists already, it will be updated. 
The alpha images will be created automatically by the git workflows. 

- If you get an artifact creation error, most likely the release was not yet created on github. Please create a new alpha-release for the new tag and re-run the failed jobs. 
